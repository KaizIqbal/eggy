import * as chromium from "chrome-aws-lambda";
import { spawn } from "child_process";
import { Handler } from "aws-lambda";
import "source-map-support/register";
import * as fs from "fs-extra";

// aws-sdk is always preinstalled in AWS Lambda in all Node.js runtimes
import S3Client from "aws-sdk/client/s3";

// create an S3 client
const s3 = new S3Client({ region: process.env.S3_REGION });

declare global {
  interface Window {
    timeline: any;
  }
}

const FPS = 60;
const WIDTH = 1280;
const HEIGHT = 720;

const SAVE_IMG = true;

// x1.5 => 1080p
// x3 => 4k
// x6 => 8k
const SCALE = 1;

const getRes = (scale = SCALE) =>
  ({
    1: "hd",
    "1.5": "fullhd",
    3: "4k",
    6: "8k"
  }[scale]);

const filename = () => {
  if (!getRes()) {
    throw Error(
      `Invalid scale, must be one of these: ${Object.keys(getRes()).join()}`
    );
  }

  return `video-${getRes()}.mov`;
};

SAVE_IMG && fs.emptyDir(`./frames-${getRes()}`);

const args = [
  "-y",
  "-f",
  "image2pipe",
  "-r",
  `${FPS}`,
  "-i",
  "-",
  "-pix_fmt",
  "yuv420p",
  "-crf",
  "2",
  filename()
];

const ffmpeg = spawn("ffmpeg", args);

const closed = new Promise((resolve, reject) => {
  ffmpeg.on("error", reject);
  ffmpeg.on("close", resolve);
});

ffmpeg.stdout.pipe(process.stdout);
ffmpeg.stderr.pipe(process.stderr);

const write = (stream, buffer) =>
  new Promise((resolve, reject) => {
    stream.write(buffer, error => {
      if (error) return reject(error);
      resolve();
    });
  });
export const render: Handler = async (event, _context) => {
  const srcKey = event.srcKey;
  let srcSvg: string;
  // Download the .svg file from the S3 source bucket.
  try {
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: srcKey
    };
    srcSvg = await s3
      .getObject(params)
      .promise()
      .toString();
  } catch (error) {
    console.log(error);
    return;
  }

  let result: any;
  let browser: any;
  let htmlContent: string;

  htmlContent = fs.readFileSync("./template/render.html").toString();

  htmlContent = htmlContent.replace("<svg>", srcSvg);

  try {
    // The binary installed by chrome-aws-lambda doesn't work on Windows
    // When running locally, substitute Chrome which is normally installed
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      ignoreDefaultArgs: process.env.IS_LOCAL ? [" --single-process "] : [],

      executablePath: process.env.IS_LOCAL
        ? "/usr/bin/google-chrome-stable"
        : await chromium.executablePath,
      headless: false // If you set this to false, the Chrome window will be displayed, so if it does not work during development it is better to change it
    });

    const page = await browser.newPage();

    await page.setViewport({
      width: WIDTH,
      height: HEIGHT,
      deviceScaleFactor: SCALE
    });

    await page.setContent(htmlContent);

    const frames = await page.evaluate(
      async fps => Math.ceil((window.timeline.duration() / 1) * fps),
      FPS
    );
    let frame = 0;

    // pause and reset
    await page.evaluate(() => {
      window.timeline.pause();
      window.timeline.progress(0);
    });

    const nextFrame = async () => {
      await page.evaluate(async progress => {
        window.timeline.progress(progress);
        await new Promise(r => setTimeout(r, 16));
      }, frame / frames);

      const filename = `${frame}`.padStart(6, "0");
      const opts = SAVE_IMG
        ? { path: `./frames-${getRes()}/frame${filename}.png` }
        : undefined;
      const screenshot = await page.screenshot(opts);
      await write(ffmpeg.stdin, screenshot);

      frame++;

      console.log(`frame ${frame} / ${frames}`);

      if (frame > frames) {
        console.log("done!");
        await browser.close();

        ffmpeg.stdin.end();
        await closed;
        return;
      }
    };
    nextFrame();
  } finally {
    if (browser) {
      await browser.close();
      result = "success";
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: `Title: ${result}`,
        srcKey: event.srcKey,
        destKey: event.destKey
      },
      null,
      2
    )
  };
};
