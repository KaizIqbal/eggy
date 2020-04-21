// aws-sdk is always preinstalled in AWS Lambda in all Node.js runtimes
import * as S3Client from "aws-sdk/clients/s3";
const s3 = new S3Client({ region: process.env.S3_REGION });

async function fetchFromS3(key: string) {
  // Fetching from S3
  const params = {
    Bucket: process.env.S3_BUCKET,
    Key: key
  };
  return await s3.getObject(params).promise();
}

async function uploadToS3(key: string, contentType: string, stream: Buffer) {
  // Configure parameter
  const params = {
    Bucket: process.env.S3_BUCKET,
    Key: key,
    ACL: "public-read",
    ContentType: contentType,
    Body: stream
  };

  // Uploading to S3

  return await s3.upload(params).promise();
}

export { fetchFromS3, uploadToS3 };
