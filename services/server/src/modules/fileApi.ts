const AWS = require("aws-sdk");

const s3bucket = new AWS.S3({
  accessKeyId: process.env.IAM_USER_KEY,
  secretAccessKey: process.env.IAM_USER_SECRET,
  Bucket: process.env.BUCKET_NAME
});

export function uploadToS3(key: any, mimetype: any, stream: any) {
  // Configure parameter
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: key,
    ACL: "public-read",
    ContentType: mimetype,
    Body: stream
  };

  // Uploading to S3
  const s3Response = s3bucket.upload(params).promise();

  return s3Response;
}

export function deleteFromS3(key: any) {
  // Configure parameter
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: key
  };

  // Deleting from S3
  const s3Response = s3bucket.deleteObject(params).promise();

  return s3Response;
}
