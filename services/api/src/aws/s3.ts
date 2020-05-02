import * as S3 from "aws-sdk/clients/s3";

let s3Bucket: string;
if (process.env.S3_BUCKET) {
  s3Bucket = process.env.S3_BUCKET;
}

const s3 = new S3();

export function uploadToS3(key: any, mimetype: any, stream: any) {
  // Configure parameter
  const params = {
    Bucket: s3Bucket,
    Key: key,
    ACL: "public-read",
    ContentType: mimetype,
    Body: stream
  };

  // Uploading to S3
  const s3Response = s3.upload(params).promise();

  return s3Response;
}

export function fetchFroms3(key: string) {
  const params = {
    Bucket: s3Bucket,
    Key: key
  };
  const s3Response = s3.getObject(params).promise();

  return s3Response;
}

export function deleteFromS3(key: any) {
  // Configure parameter
  const params = {
    Bucket: s3Bucket,
    Key: key
  };

  // Deleting from S3
  const s3Response = s3.deleteObject(params).promise();

  return s3Response;
}
export function deleteRenderImages(data: any) {
  const keys: Array<string> = [];
  const sizes = [24, 28, 32, 40, 48, 56, 64, 72, 80, 88, 96];
  const responseKeys = JSON.parse(JSON.stringify(data));
  responseKeys.filter((obj: any) => keys.push(obj.key));
  // Deleting render files from S3
  keys.forEach(key => {
    deleteFromS3(key);
    sizes.forEach(size => {
      const sizeKey = key.replace("raw", `${size}x${size}`);
      deleteFromS3(sizeKey);
    });
  });
}
