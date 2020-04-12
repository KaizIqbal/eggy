// Helper Functions
import checkFlavor from "../../utils/checkFlavor";
import checkCursor from "../../utils/checkCursor";
import { fetchFroms3 } from "../../modules/fileApi";

export const cursorMutations = {
  // ################################################ CREATE CURSOR ################################################

  async createCursor(parent, args, ctx, info) {
    // seprate flavorId and cursor data
    const flavorId = args.flavorId;
    delete args.flavorId;

    // Checking user has permissions or not if not then throw Error
    await checkFlavor(ctx, flavorId, ["ADMIN", "CURSORCREATE"]);

    const [data] = await ctx.db.query.cursors(
      {
        where: { name: args.name }
      },
      info
    );

    if (data) {
      throw new Error("Cursor is already Available");
    }

    const cursor = await ctx.db.mutation.createCursor(
      {
        data: {
          // Provide relationship between Flavor and Cursor
          flavor: {
            connect: {
              id: flavorId
            }
          },
          ...args
        }
      },
      info
    );

    return cursor;
  },

  // ################################################ UPDATE CURSOR ################################################

  async updateCursor(parent, args, ctx, info) {
    // separate data from args
    const cursorId = args.id;
    delete args.id;

    // Checking user has permissions or not if not then throw Error
    await checkCursor(ctx, cursorId, ["ADMIN", "CURSORUPDATE"]);

    // return updated cursor by id
    return ctx.db.mutation.updateCursor(
      {
        where: {
          id: cursorId
        },
        data: { ...args }
      },
      info
    );
  },
  // ################################################ RENAME CURSOR ################################################
  async renameCursor(parent, args, ctx, info) {
    // Checking user has permissions or not if not then throw Error
    await checkCursor(ctx, args.id, ["ADMIN", "CURSORUPDATE"]);

    let updateCursor: any;

    // separate id from args
    const cursorId = args.id;
    delete args.id;
    const flavorId = args.flavorId;
    delete args.flavorId;

    const [data] = await ctx.db.query.cursors(
      {
        where: { name: args.name, flavor: { id: flavorId } }
      },
      info
    );
    // if cursor already available
    if (data) {
      // Same Cursor so do nothing
      if (data.id === cursorId) {
        updateCursor = data;
      } else {
        throw new Error("Cursor already available");
      }
    }
    // Normal Rename
    else {
      // TODO Update S3 files
      updateCursor = ctx.db.mutation.updateCursor(
        {
          where: {
            id: cursorId
          },
          data: { ...args }
        },
        info
      );
    }

    // return updated cursor by id
    return updateCursor;
  },

  // ################################################ DELETE CURSOR ################################################

  async deleteCursor(parent, args, ctx, info) {
    // separate id from args
    const cursorId = args.id;
    delete args.id;

    // Checking user has permissions or not if not then throw Error
    // await checkCursor(ctx, cursorId, ["ADMIN", "CURSORDELETE"]);

    // Delete flavor by id
    return ctx.db.mutation.deleteCursor({ where: { id: cursorId } }, info);
  },

  async renderCursor(parent, args, ctx, info) {
    // deconstruct id from args
    const { id } = args;

    const cursor = await ctx.db.query.cursor(
      { where: { id } },
      `{
        name
        frames
        source {
          key
        }
    }`
    );

    if (!cursor) {
      throw new Error("Cursor not Found");
    }

    if (!cursor!.source) {
      throw new Error("source file not found for this cursor");
    }

    // data of generated cursor
    const {
      name: fileName,
      frames,
      source: { key }
    } = cursor;

    // Fetch Source File From Amazon S3
    const sourceSvg = await fetchFroms3(key);

    // Update Cursors
    // TODO
    return ctx.db.query.cursor({ where: { id } }, info);
  }
};
