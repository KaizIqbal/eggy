import { uploadToS3, deleteFromS3 } from "../../modules/s3";
import isAuth from "../../utils/isAuth";

export const fileMutations = {
  // ################################################ UPLOAD FILE ################################################

  async uploadFile(parent, args, ctx, info) {
    // Checking user logged in or not if not then throw Error
    isAuth(ctx);

    if (!args.file) {
      throw new Error("ERROR: No file received.");
    }

    const { createReadStream, filename, mimetype, encoding } = await args.file;

    if (mimetype !== "image/svg+xml") {
      throw new Error("ERROR: Only .svg file Supported");
    }

    // creating Stream
    const stream = createReadStream();

    // Fetch names from database for S3 file structure && delete all render stuff

    const data = await ctx.db.mutation.updateCursor(
      {
        where: { id: args.cursorId },
        data: { isRendered: false }
      },
      `{
        name
        flavor {
          name
          egg {
            eggname
            user {
              username
            }
          }
        }
      }`
    );

    if (!data) {
      throw new Error("Something Went Wrong");
    }

    // Removing old render files attached with this file
    await ctx.db.mutation.deleteManyRenderFiles({
      where: { cursor: { id: args.cursorId } }
    });

    // generating file name for s3
    const name = data.name + getFileExtension(filename);

    // Generating S3 file strucutre
    const key =
      data.flavor.egg.user.username +
      "/" +
      data.flavor.egg.eggname +
      "/" +
      data.flavor.name +
      "/source/" +
      name;

    // fileApi call
    const s3Response = await uploadToS3(key, mimetype, stream);

    // get url from s3 Response
    const url = s3Response.Location;

    // add detail to prisma
    return await ctx.db.mutation.upsertFile(
      {
        where: {
          url
        },
        update: {
          key,
          filename: name,
          mimetype,
          encoding,
          url
        },
        create: {
          cursor: { connect: { id: args.cursorId } },
          key,
          filename: name,
          mimetype,
          encoding,
          url
        }
      },
      info
    );
  },

  // ################################################ DELETE FILE ################################################

  async deleteFile(parent, args, ctx, info) {
    // Checking user logged in or not if not then throw Error
    isAuth(ctx);

    // fetching key from id in databse
    const data = await ctx.db.query.file(
      { where: { id: args.fileId } },
      `{ 
        id 
        key
        cursor {
          id
        }
      }`
    );

    // file not found for specific id
    if (!data) {
      throw new Error("ERROR: file not found");
    }

    // Deletng from S3
    const s3Response = await deleteFromS3(data.key);

    if (s3Response.deleteMarker) {
      throw new Error("ERROR: File not deleted");
    }

    // Removing render files attached with this file
    await ctx.db.mutation.deleteManyRenderFiles({
      where: { cursor: { id: args.cursorId } }
    });

    await ctx.db.mutation.updateCursor({
      where: { id: data.cursor.id },
      data: { isRendered: false }
    });

    // Deleting from Prisma Database and returning
    return await ctx.db.mutation.deleteFile(
      { where: { id: args.fileId } },
      info
    );
  }
};

// ########### HELPER FUNCTION ###########

function getFileExtension(filename) {
  let ext = /[.]/.exec(filename) ? /[^.]+$/.exec(filename)[0] : "";
  if (ext !== "") {
    ext = "." + ext;
  }
  return ext;
}
