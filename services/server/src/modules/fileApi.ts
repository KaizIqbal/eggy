import * as uuid from "uuid";

import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_KEY,
  secretAccessKey: process.env.S3_SECRET,
  params: {
    Bucket: process.env.S3_BUCKET
  }
});

exports.processUpload = async (upload, ctx) => {
  if (!upload) {
    return console.log("ERROR: No file received.");
  }

  const { stream, filename, mimetype, encoding } = await upload;
  const key = uuid() + "-" + filename;

  // Upload to S3
  const response = await s3
    .upload({
      Key: key,
      ACL: "public-read",
      Body: stream
    })
    .promise();

  const url = response.Location;

  // Sync with Prisma
  const data = {
    filename,
    mimetype,
    encoding,
    url
  };

  const { id } = await ctx.db.mutation.createFile({ data }, ` { id } `);

  const file = {
    id,
    filename,
    mimetype,
    encoding,
    url
  };

  console.log("saved prisma file:");
  console.log(file);

  return file;
};
