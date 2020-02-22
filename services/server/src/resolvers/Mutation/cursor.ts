// Helper Functions
import loggedIn from "../../utils/loggedIn";

export const cursorMutations = {
  // ################################################ CREATE CURSOR ################################################

  async createCursor(parent, args, ctx, info) {
    // Checking user logged in or not if not then throw Error
    loggedIn(ctx);

    // seprate flavorId and cursor data
    const flavorId = args.flavorId;
    delete args.flavorId;

    const data = await ctx.db.query.cursors(
      {
        where: { name: args.name }
      },
      `{id}`
    );

    if (data[0]) {
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
    loggedIn(ctx);

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
    loggedIn(ctx);

    // Delete flavor by id
    return ctx.db.mutation.deleteCursor({ where: { id: args.id } }, info);
  },

  // ################################################ RENAME CURSOR ################################################
  async renameCursor(parent, args, ctx, info) {
    // Checking user logged in or not if not then throw Error
    loggedIn(ctx);

    let updateCursor;

    // separate id from args
    const cursorId = args.id;
    delete args.id;
    const flavorId = args.flavorId;
    delete args.flavorId;

    const data = await ctx.db.query.cursors(
      {
        where: { name: args.name, flavor: { id: flavorId } }
      },
      `{
        id
      }`
    );

    // if cursor already available
    if (data[0]) {
      throw new Error("Cursor already available");
    }

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

    // return updated cursor by id
    return updateCursor;
  }
};
