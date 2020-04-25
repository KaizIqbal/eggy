import { aws } from "./awsConfig";

const s3bucket = new aws.S3({
  Bucket: process.env.S3_BUCKET
});

export function uploadToS3(key: any, mimetype: any, stream: any) {
  // Configure parameter
  const params = {
    Key: key,
    ACL: "public-read",
    ContentType: mimetype,
    Body: stream
  };

  // Uploading to S3
  const s3Response = s3bucket.upload(params).promise();

  return s3Response;
}

export function fetchFroms3(key: string) {
  const params = {
    Key: key
  };
  const s3Response = s3bucket.getObject(params).promise();

  return s3Response;
}

export function deleteFromS3(key: any) {
  // Configure parameter
  const params = {
    Key: key
  };

  // Deleting from S3
  const s3Response = s3bucket.deleteObject(params).promise();

  return s3Response;
}
