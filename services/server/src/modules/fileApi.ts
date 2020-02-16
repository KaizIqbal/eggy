import * as uuid from "uuid";
const AWS = require("aws-sdk");

const s3bucket = new AWS.S3({
  accessKeyId: process.env.IAM_USER_KEY,
  secretAccessKey: process.env.IAM_USER_SECRET,
  Bucket: process.env.BUCKET_NAME
});

function uploadToS3(filename: any, stream: any) {
  // Generate unique name for each file
  const key = uuid() + "-" + filename;

  // Configure parameter
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: key,
    ACL: "public-read",
    Body: stream
  };

  // Uploading to S3
  const s3Response = s3bucket.upload(params).promise();

  return s3Response;
}

export default uploadToS3;
