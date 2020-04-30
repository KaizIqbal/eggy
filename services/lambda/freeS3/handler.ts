import { Handler } from "aws-lambda";
import "source-map-support/register";

import { deleteFromS3 } from "./utils/s3";

// trigger when files deleted in "raw" folder
export const freeS3: Handler = async (event, context) => {
  // Object key may have spaces or unicode non-ASCII characters.
  const srcKey = decodeURIComponent(
    event.Records[0].s3.object.key.replace(/\+/g, " ")
  );

  // check key is valid
  if (!srcKey.includes("render/raw/")) {
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
  const sizes = [24, 28, 32, 40, 48, 56, 64, 72, 80, 88, 96];
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
