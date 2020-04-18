import { Handler } from "aws-lambda";
import "source-map-support/register";

import { fetchSvgFromS3 } from "./utils/fetchSvgFromS3";
import { generateRenderTemplate } from "./template/render";

export const render: Handler = async (_event, _context) => {
  // const srcKey = event.srcKey;
  const key = "@ful1ie5_/Bibata-KflzAZTR5/Sharp/source/X11.svg";

  const svg = await fetchSvgFromS3(key);
  const template = generateRenderTemplate(svg);

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
