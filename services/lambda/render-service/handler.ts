import { Handler } from "aws-lambda";
import "source-map-support/register";
import * as chromium from "chrome-aws-lambda";
import * as fs from "fs";
import { renderTemplate } from "./template/render";

// aws-sdk is always preinstalled in AWS Lambda in all Node.js runtimes
import * as S3Client from "aws-sdk/clients/s3";
const s3 = new S3Client({ region: process.env.S3_REGION });

export const render: Handler = async (_event, _context) => {
  let browser: any, result: any;

  // const srcKey = event.srcKey;
  const srcKey = "@ful1ie5_/Bibata-KflzAZTR5/Sharp/source/X11.svg";
  let srcSvg: string;
  let template = renderTemplate;

  // Download the .svg file from the S3 source bucket.
  try {
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: srcKey
    };
    const response = await s3.getObject(params).promise();
    const { Body } = response;
    srcSvg = Body.toString();
  } catch (error) {
    return;
  }

  try {
    // 👇 👇 Injecting .svg file in template here 👇 👇
    template = template.replace("<svginjection>", srcSvg);
    // The binary installed by chrome-aws-lambda doesn't work on linux
    // When running locally, substitute Chrome which is normally installed
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      ignoreDefaultArgs: process.env.IS_LOCAL ? [" --single-process "] : [],
      defaultViewport: chromium.defaultViewport,
      executablePath: process.env.IS_LOCAL
        ? "/usr/bin/google-chrome-stable"
        : await chromium.executablePath,
      headless: chromium.headless // If you set this to false, the Chrome window will be displayed, so change it if it does not work during development.
    });
    const page = await browser.newPage();
    await page.setContent(template);
    await page.evaluate(() => (document.body.style.background = "transparent")); // for transparent background
    await page.waitForNavigation({ waitUntil: "load" });
    const svgElement = await page.select("svg");

    await svgElement.screenshot({
      omitBackground: true
    });
  } finally {
    if (browser) {
      await browser.close();
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "hello"
      },
      null,
      2
    )
  };
};
