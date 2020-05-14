// aws-sdk is always preinstalled in AWS Lambda in all Node.js runtimes
import * as S3Client from "aws-sdk/clients/s3";
const s3 = new S3Client({ region: process.env.REGION });

export const fetchFromS3 = async (key: string) => {
  // Fetching from S3
  const params = {
    Bucket: process.env.S3_BUCKET,
    Key: key,
  };
  return await s3.getObject(params).promise();
};

export const uploadToS3 = async (
  key: string,
  contentType: string,
  stream: Buffer
) => {
  // Configure parameter
  const params = {
    Bucket: process.env.S3_BUCKET,
    Key: key,
    ACL: "public-read",
    ContentType: contentType,
    Body: stream,
  };

  // Uploading to S3
  return await s3.upload(params).promise();
};
