import * as fileApi from "../../modules/fileApi";
import loggedIn from "../../utils/loggedIn";
import uuid = require("uuid");

export const fileMutations = {
  async uploadFile(parent, args, ctx, info) {
    // Checking user logged in or not if not then throw Error
    loggedIn(ctx);

    if (!args.file) {
      throw new Error("ERROR: No file received.");
    }

    const { createReadStream, filename, mimetype, encoding } = await args.file;

    // creating Stream
    const stream = createReadStream();

    // Generate unique name for each file
    const key = uuid() + "-" + filename;

    // fileApi call
    const s3Response = await fileApi.uploadToS3(key, stream);

    // get url from s3 Response
    const url = s3Response.Location;

    // add detail to prisma
    const file = await ctx.db.mutation.createFile(
      {
        data: {
          key: key,
          filename: filename,
          mimetype: mimetype,
          encoding: encoding,
          url: url,
          cursor: { connect: { id: args.cursorId } }
        }
      },
      info
    );

    // return File
    return file;
  },
  async deleteFile(parent, args, ctx, info) {
    // Checking user logged in or not if not then throw Error
    loggedIn(ctx);

    // fetching key from id in databse
    const data = await ctx.db.query.file(
      { where: { id: args.fileId } },
      `{ id key }`
    );

    // file not found for specific id
    if (!data) {
      throw new Error("ERROR: file not found");
    }

    // Deletng from S3
    const s3Response = await fileApi.deleteFromS3(data.key);

    if (s3Response.deletedMarker) {
      throw new Error("ERROR: File not deleted");
    }

    // Deleting from Prisma Database and returning
    return await ctx.db.mutation.deleteFile(
      { where: { id: args.fileId } },
      info
    );
  }
};
