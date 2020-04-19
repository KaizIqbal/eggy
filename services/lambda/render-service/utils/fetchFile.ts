import { fetchFromS3 } from "./s3";

async function fetchFile(key: string) {
  const response = await fetchFromS3(key);
  const { Body } = response;

  // Convert Buffer to String
  const svg: string = Body.toString();

  return svg;
}

export { fetchFile };
