import uploadToS3 from "../../modules/fileApi";
import loggedIn from "../../utils/loggedIn";

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

    // fileApi call
    const s3Response = await uploadToS3(filename, stream);

    console.log(s3Response);

    // get url from s3 Response
    const url = s3Response.Location;

    // add detail to prisma
    const file = await ctx.db.mutation.createFile(
      {
        data: {
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
  }
};
