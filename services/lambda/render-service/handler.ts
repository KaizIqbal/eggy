import { Handler } from "aws-lambda";
import "source-map-support/register";
import * as path from "path";

import { fetchSvgFromS3 } from "./utils/fetchSvgFromS3";
import { generateRenderTemplate } from "./template/render";
import { renderSvg } from "./utils/renderSvg";

export const render: Handler = async (_event, _context) => {
  // const srcKey = event.srcKey;
  const key: string = "@ful1ie5_/Bibata-KflzAZTR5/Sharp/source/X11.svg";
  const frames: number = 2;

  const svg = await fetchSvgFromS3(key);

  // get fileName from key & remove extension
  let fileName = path.parse(key).base;
  fileName = fileName.split(".")[0].toString();

  const template = generateRenderTemplate(svg);
  const renderImages = await renderSvg(template, frames, fileName);

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
