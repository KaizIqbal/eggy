import * as chromium from "chrome-aws-lambda";

import { Image } from "../types";
import { uploadToS3 } from "./s3";
const pad = (number: number, length: number) => {
  var str = "" + number;
  while (str.length < length) {
    str = "0" + str;
  }
  return str;
};

const renderSvg = async (
  template: string,
  frames: number,
  filePrefix: string,
  destPath: string
) => {
  // Browser & HTML Template instance
  let browser: any;

  const renderImages = [];

  try {
    // -------------------------------------------- SETUP BROWSER
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      ignoreDefaultArgs: process.env.IS_LOCAL ? [" --single-process "] : [],
      defaultViewport: chromium.defaultViewport,
      executablePath: process.env.IS_LOCAL
        ? "/usr/bin/google-chrome-stable"
        : await chromium.executablePath,
      headless: chromium.headless, // If you set this to false, the Chrome window will be displayed, so change it if it does not work during development.
    });

    const page = await browser.newPage();
    await page.setContent(template);

    await page.waitForSelector("#container");
    const svgImage = await page.$("#container svg");

    if (!svgImage) throw new Error("svg element not found");

    // -------------------------------------------- RENDER FRAMES
    for (let index = 1; index <= frames; index++) {
      const padIndex = pad(index, frames.toString().length);
      // generate filename & rendered image as base64 encoding
      const fileName: string =
        frames === 1 ? `${filePrefix}.png` : `${filePrefix}-${padIndex}.png`;

      const b64string: string = (await svgImage.screenshot({
        omitBackground: true,
        encoding: "base64",
      })) as string;
      const Body: Buffer = Buffer.from(b64string, "base64");

      // setup object
      const temp: Image = {
        fileName,
        contentType: "image/png",
        encoding: "base64",
        Body,
      };
      console.log(`Rendered Frame ${padIndex}/${frames}`);

      // uploading raw images
      const key: string = destPath + temp.fileName;
      console.log(`Uploading Frames ${padIndex}/${frames}`);
      const response = await uploadToS3(key, temp.contentType, temp.Body);

      // push details to Object
      renderImages.push({
        key: response.Key,
        url: response.Location,
        mimetype: temp.contentType,
        encoding: temp.encoding,
      });
    }
  } catch (error) {
    throw new Error(error);
  } finally {
    if (browser) {
      await browser.close();
    }
    return renderImages;
  }
};

export { renderSvg };
