import { Handler } from "aws-lambda";
import "source-map-support/register";
import * as path from "path";

import { generateRenderTemplate } from "./template/render";
import { fetchFile } from "./utils/fetchFile";
import { renderSvg } from "./utils/renderSvg";
import { uploadFiles } from "./utils/uploadFiles";

export const render: Handler = async (event, _context) => {
  let result: any;

  const { srcKey, destKey, frames } = event;
  try {
    // fix destKey :: store rendered images in directory not in file
    const destPath = destKey.endsWith("/") ? destKey : destKey.concat("/");

    const svg = await fetchFile(srcKey);

    // get fileName from key & remove extension
    let fileName = path.parse(srcKey).base;
    fileName = fileName.split(".")[0];

    const template = generateRenderTemplate(svg);
    const renderImages = await renderSvg(template, frames, fileName);

    result = await uploadFiles(renderImages, destPath);
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          message: "Internal Server Error!!"
        },
        null,
        2
      )
    };
  } finally {
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          data: result
        },
        null,
        2
      )
    };
  }
};
