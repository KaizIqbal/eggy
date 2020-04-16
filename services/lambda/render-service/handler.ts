import { Handler } from "aws-lambda";
import "source-map-support/register";
import * as fs from "fs";
import * as chromium from "chrome-aws-lambda";
import timesnap from "timesnap";
// const timesnap = require("timesnap");
import { readFiles } from "./utils/readFiles";

// aws-sdk is always preinstalled in AWS Lambda in all Node.js runtimes
const S3Client = require("aws-sdk/clients/s3");
// create an S3 client
const s3 = new S3Client({ region: process.env.S3_REGION });

export const render: Handler = async (event, _context) => {
  const srcKey = event.srcKey;
  let srcSvg: string;
  let template: string;

  // Download the .svg file from the S3 source bucket.
  try {
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: srcKey
    };
    srcSvg = await s3.getObject(params).toString();
  } catch (error) {
    return;
  }

  template = fs.readFileSync("./template/render.html").toString();
  template = template.replace("<svginjection>", srcSvg);

  try {
    fs.writeFileSync(__dirname + "/index.html", template);
    //file written successfully
  } catch (err) {
    console.error(err);
    return;
  }
  await timesnap({
    executablePath: process.env.IS_LOCAL
      ? "/usr/bin/google-chrome-stable"
      : await chromium.executablePath,
    transparentBackground: true,
    selector: "svg",
    fps: 1,
    duration: 44,
    outputDirectory: "render/raw",
    outputPattern: "animated-%d.png"
  });

  // use an absolute path to the folder where files are located
  readFiles(
    "render/raw/",
    (filename, content) => {
      console.log("file name:", filename);
    },
    err => {
      throw err;
    }
  );

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
