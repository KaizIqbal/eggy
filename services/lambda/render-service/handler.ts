import { Handler } from "aws-lambda";
import "source-map-support/register";
// import * as path from "path";

import { generateRenderTemplate } from "./template/render";
import * as path from "path";

import { fetchFile } from "./utils/fetchFile";
import { renderSvg } from "./utils/renderSvg";

export const render: Handler = async (_event, _context) => {
  // const { srcKey, destKey, frames } = event;

  const srcKey: string = "@ful1ie5_/Bibata-KflzAZTR5/Sharp/source/X11.svg";
  const destKey: string = "@ful1ie5_/Bibata-KflzAZTR5/Sharp/render";
  const frames: number = 1;

  // fix destKey :: store rendered images in directory not in file
  const path = destKey.endsWith("/") ? destKey : destKey.concat("/");

  const svg = await fetchFile(srcKey);

  // get fileName from key & remove extension
  let fileName = path.parse(srcKey).base;
  fileName = fileName.split(".")[0];

  const template = generateRenderTemplate(svg);
  const renderImages = await renderSvg(template, frames, fileName, path);

  console.log(renderImages);

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
