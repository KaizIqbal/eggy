import { Handler } from "aws-lambda";
import "source-map-support/register";
import * as path from "path";

import { generateRenderTemplate } from "./template/render";
import { fetchFile } from "./utils/fetchFile";
import { renderSvg } from "./utils/renderSvg";

import { sizes } from "./sizes";
import { deleteFromS3 } from "./utils/s3";

// This Function for generate png file on s3
export const render: Handler = async (event, context) => {
  const { srcKey, destKey, frames } = event;
  let result: any;

  if (!srcKey || !destKey || !frames) {
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          error: "Some Arguments are missing"
        },
        null,
        2
      )
    };
  }

  try {
    // fix destKey :: store rendered images in directory not in file
    const destPath = destKey.endsWith("/") ? destKey : destKey.concat("/");

    const svg = await fetchFile(srcKey);

    // get fileName from key & remove extension
    let fileName = path.parse(srcKey).base;
    fileName = fileName.split(".")[0];

    const template = generateRenderTemplate(svg);
    result = await renderSvg(template, frames, fileName, destPath);
  } catch (error) {
    return context.fail(error);
  } finally {
    return context.succeed(result);
  }
};

// trigger when files deleted in "raw" folder
export const freeS3: Handler = async (event, context) => {
  // Object key may have spaces or unicode non-ASCII characters.
  const srcKey = decodeURIComponent(
    event.Records[0].s3.object.key.replace(/\+/g, " ")
  );

  // check key is valid
  if (!srcKey.includes("raw/")) {
    console.log("No Action!!! Operation is not in 'raw' directory");
    return;
  }
  // Infer the image type from the file suffix.
  const typeMatch = srcKey.match(/\.([^.]*)$/);
  if (!typeMatch) {
    console.log("No Action!! Could not determine the image type.");
    return;
  }

  // Check that the image type is supported
  const imageType = typeMatch[1].toLowerCase();
  if (imageType !== "png") {
    console.log(`No Action!! Unsupported image type: ${imageType}`);
    return;
  }

  // generating other related keys
  const keys: array<string> = [];

  sizes.forEach(size => {
    keys.push(srcKey.replace("raw", `${size}x${size}`));
  });

  try {
    keys.forEach(key => {
      deleteFromS3(key);
    });
  } catch (error) {
    return context.fail(error);
  } finally {
    return context.succeed(null);
  }
};
