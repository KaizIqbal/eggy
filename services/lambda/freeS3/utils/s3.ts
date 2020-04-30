// aws-sdk is always preinstalled in AWS Lambda in all Node.js runtimes
import * as S3Client from "aws-sdk/clients/s3";
const s3 = new S3Client({ region: process.env.S3_REGION });
async function deleteFromS3(key: string) {
  try {
    // Configure parameter
    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: key
    };

    // Uploading to S3
    return await s3.deleteObject(params).promise();
  } catch (error) {
    throw new Error(error);
  }
}

export { deleteFromS3 };
