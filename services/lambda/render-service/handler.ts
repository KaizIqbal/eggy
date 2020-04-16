import { Handler } from "aws-lambda";
import "source-map-support/register";
import * as chromium from "chrome-aws-lambda";
import * as fs from "fs";
const timesnap = require("timesnap");

// aws-sdk is always preinstalled in AWS Lambda in all Node.js runtimes
const S3Client = require("aws-sdk/clients/s3");

// create an S3 client
const s3 = new S3Client({ region: process.env.S3_REGION });

export const render: Handler = async (event, _context) => {
  const srcKey = event.srcKey;
  let srcSvg: string;

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

  // executablePath: process.env.IS_LOCAL
  //   ? "/usr/bin/google-chrome-stable"
  //   : await chromium.executablePath

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
