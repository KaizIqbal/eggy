import "source-map-support/register";
import { Handler } from "aws-lambda";

import * as chromium from "chrome-aws-lambda";

// aws-sdk is always preinstalled in AWS Lambda in all Node.js runtimes
import S3Client from "aws-sdk/client/s3";

// create an S3 client
const s3 = new S3Client({ region: process.env.S3_REGION });

// default browser viewport size
const defaultViewport = {
  width: 1440,
  height: 1080
};

export const render: Handler = async (event, _context) => {
  const srcKey = event.srcKey;

  // Download the .svg file from the S3 source bucket.
  try {
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: srcKey
    };
    const svgFile = await s3.getObject(params).promise();
  } catch (error) {
    console.log(error);
    return;
  }

  let result: any;
  let browser: any;
  try {
    // The binary installed by chrome-aws-lambda doesn't work on Windows
    // When running locally, substitute Chrome which is normally installed
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      ignoreDefaultArgs: process.env.IS_LOCAL ? [" --single-process "] : [],
      defaultViewport,
      executablePath: process.env.IS_LOCAL
        ? "/usr/bin/google-chrome-stable"
        : await chromium.executablePath,
      headless: false // If you set this to false, the Chrome window will be displayed, so if it does not work during development it is better to change it
    });

    const page = await browser.newPage();

    await page.goto("https://example.com");

    result = await page.title();
  } finally {
    if (browser) {
      await browser.close();
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
