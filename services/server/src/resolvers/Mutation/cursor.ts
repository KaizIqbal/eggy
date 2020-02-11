// Helper Functions
import loggedIn from "../../utils/loggedIn";

export const cursorMutations = {
  // ###### CREATE CURSOR ######

  async createCursor(parent, args, ctx, info) {
    // Checking user logged in or not if not then throw Error
    loggedIn(ctx);

    // seprate flavorId and cursor data
    const flavorId = args.flavorId;
    delete args.flavorId;

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

  // ###### UPDATE CURSOR ######

  updateCursor(parent, args, ctx, info) {
    // Checking user logged in or not if not then throw Error
    loggedIn(ctx);

    // first take copy in updates
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

  // ###### DELETE CURSOR ######

  deleteCursor(parent, args, ctx, info) {
    // Checking user logged in or not if not then throw Error
    loggedIn(ctx);

    // Delete flavor by id
    return ctx.db.mutation.deleteCursor({ where: { id: args.id } }, info);
  }
};
