import { uploadToS3 } from "./s3";
import { RenderImages } from "../types";

// async function uploadImages(destKey: string, renderImages: RenderImages) {
async function uploadFiles(renderImages: RenderImages, destPath: string) {
  const categories = Object.keys(renderImages);

  let result: any;

  // Uploading all Files
  categories.map(async (category) => {
    const images = renderImages[category];
    const data = images.filter(async (image) => {
      const key: string = destPath + category + "/" + image.fileName;
      const response = await uploadToS3(key, image.contentType, image.Body);

      return {
        key,
        url: response.Location,
        mimetype: image.contentType,
        encoding: image.encoding
      };
    });
    if (category === "raw") result = data;
  });

  return result;
}

export { uploadFiles };
