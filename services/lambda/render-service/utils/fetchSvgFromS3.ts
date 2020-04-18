import * as path from "path";
// aws-sdk is always preinstalled in AWS Lambda in all Node.js runtimes
import * as S3Client from "aws-sdk/clients/s3";
const s3 = new S3Client({ region: process.env.S3_REGION });

async function fetchSvgFromS3(key: string) {
  let svg: string;

  // Fetching from S3
  try {
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: key
    };
    const response = await s3.getObject(params).promise();
    const { Body } = response;

    // Convert Buffer to String
    svg = Body.toString();
  } catch (error) {
    console.error(error);
    return;
  }

  // get fileName from key & remove extension
  let fileName = path.parse(key).base;
  fileName = fileName.split(".")[0];

  return { svg, fileName };
}

export { fetchSvgFromS3 };
