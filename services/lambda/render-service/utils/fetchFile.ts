import { fetchFromS3 } from "./s3";

async function fetchFile(key: string) {
  let svg: string;
  try {
    const response = await fetchFromS3(key);
    const { Body } = response;

    // Convert Buffer to String
    svg = Body.toString();
  } catch (error) {
    throw new Error(error);
  } finally {
    return svg;
  }
}

export { fetchFile };
