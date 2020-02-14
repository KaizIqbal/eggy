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
    Body: stream
  };

  // Uploading to S3
  const s3Response = s3bucket.upload(params).promise();

  return s3Response;
}

export default uploadToS3;

// const s3 = new AWS.S3({
//   accessKeyId: process.env.IAM_USER_KEY,
//   secretAccessKey: process.env.IAM_USER_SECRET,
//   Bucket: process.env.BUCKET_NAME
// });

// const processUpload = async (upload, ctx, info) => {
//   if (!upload) {
//     throw new Error("ERROR: No file received.");
//   }

//   const { stream, filename, mimetype, encoding } = await upload;
//   const key = uuid() + "-" + filename;

//   // Upload to S3
//   const response = await s3
//     .upload({
//       Key: key,
//       ACL: "public-read",
//       Body: stream
//     })
//     .promise();

//   const url = response.Location;

//   // Sync with Prisma
//   const data = {
//     filename,
//     mimetype,
//     encoding,
//     url
//   };

//   const file = await ctx.db.mutation.createFile({ data }, info);

//   console.log("saved prisma file:");
//   console.log(file);

//   return file;
// };

// export default processUpload;
