import * as chromium from "chrome-aws-lambda";

import { Image } from "../types";
import { uploadToS3 } from "./s3";

async function renderSvg(
  template: string,
  frames: number,
  filePrefix: string,
  destPath: string
) {
  // Browser & HTML Template instance
  let browser: any;

  const result = [];
  const images: Array<Image> = [];

  try {
    // -------------------------------------------- SETUP BROWSER

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
    await page.setContent(template, { waitUntil: "load" });

    await page.waitForSelector("#container");
    const svgImage = await page.$("#container");

    if (!svgImage) throw new Error("svg element not found");
    // -------------------------------------------- RENDER FRAMES


    for (let index = 1; index <= frames; index++) {
      // generate filename & rendered image as base64 encoding
      const fileName: string =
        frames === 1 ? `${filePrefix}.png` : `${filePrefix}-${index}.png`;

      const b64string: string = (await svgImage.screenshot({
        omitBackground: true,
        encoding: "base64"
      })) as string;
      const Body: Buffer = Buffer.from(b64string, "base64");

      // setup object
      const image: Image = {
        fileName,
        contentType: "image/png",
        encoding: "base64",
        Body
      };

      // push details to Object
      images.push(image);

      // Display rendered frame log
      console.log(`Rendered Frame ${index}/${frames}`);

      // uploading raw images
      const key: string = destPath + image.fileName;
      const response = await uploadToS3(key, image.contentType, image.Body);

      console.log(`Uploading Frames ${index}/${frames}`);
      result.push({
        key: response.Key,
        url: response.Location,
        mimetype: image.contentType,
        encoding: image.encoding
      });
    }

  } catch (error) {
    throw new Error(error);
  } finally {
    if (browser) {
      await browser.close();
    }
    return result;
  }
}

export { renderSvg };
