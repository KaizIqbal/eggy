import { Handler } from "aws-lambda";
import "source-map-support/register";
import * as path from "path";

import { generateRenderTemplate } from "./template/render";
import { fetchFile } from "./utils/fetchFile";
import { renderSvg } from "./utils/renderSvg";

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
  // delete all resize render files
  let result = null;
  try {
    console.log(event.s3);
  } catch (error) {
    return context.fail(error);
  } finally {
    return context.succeed(result);
  }
};
