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

    console.log(stream, filename, mimetype, encoding);
    // const url = "test.test.com";
    // const file = await ctx.db.mutation.createFile(
    //   {
    //     data: {
    //       filename: filename,
    //       mimetype: mimetype,
    //       encoding: encoding,
    //       url: url
    //     }
    //   },
    //   info
    // );

    return { id: "sdsdsdsd24234" };
  }
};
