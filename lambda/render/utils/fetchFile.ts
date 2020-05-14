import { fetchFromS3 } from "./s3";

export const fetchFile = async (key: string) => {
  const response = await fetchFromS3(key);
  const { Body } = response;

  // Convert Buffer to String
  return Body.toString();
};
