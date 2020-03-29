// Helper Functions
import isAuth from "../../utils/isAuth";

export const cursorMutations = {
  // ################################################ CREATE CURSOR ################################################

  async createCursor(parent, args, ctx, info) {
    // Checking user logged in or not if not then throw Error
    isAuth(ctx);

    // seprate flavorId and cursor data
    const flavorId = args.flavorId;
    delete args.flavorId;

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

  updateCursor(parent, args, ctx, info) {
    // Checking user logged in or not if not then throw Error
    isAuth(ctx);

    // separate data from args
    const cursorId = args.id;
    delete args.id;

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

  // ################################################ DELETE CURSOR ################################################

  deleteCursor(parent, args, ctx, info) {
    // Checking user logged in or not if not then throw Error
    isAuth(ctx);

    // Delete flavor by id
    return ctx.db.mutation.deleteCursor({ where: { id: args.id } }, info);
  },

  // ################################################ RENAME CURSOR ################################################
  async renameCursor(parent, args, ctx, info) {
    // Checking user logged in or not if not then throw Error
    isAuth(ctx);

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
  }
};
