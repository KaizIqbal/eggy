// import { uploadToS3 } from "./s3";
import { RenderImages } from "../types";

// async function uploadImages(destKey: string, renderImages: RenderImages) {
async function uploadFiles(renderImages: RenderImages) {
  const categories = Object.keys(renderImages);

  categories.map(async category => {
    console.log(category);
  });

  // await uploadToS3();
  return;
}

export { uploadFiles };
