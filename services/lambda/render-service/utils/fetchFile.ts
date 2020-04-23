import { fetchFromS3 } from "./s3";

async function fetchFile(key: string) {
  try {
    const response = await fetchFromS3(key);
    const { Body } = response;

    // Convert Buffer to String
    return Body.toString();
  } catch (error) {
    throw new Error(error);
  }
}

export { fetchFile };
