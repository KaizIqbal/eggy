// Helper Functions
import loggedIn from "../../utils/loggedIn";

export const cursorQueries = {
  // ###### FOR FETCH SINGLE CURSOR ######

  async cursor(parent, args, ctx, info) {
    // Checking user logged in or not if not then throw Error
    loggedIn(ctx);

    //get one cursor id by cursors
    const data = await ctx.db.query.cursors(
      {
        where: {
          name: args.cursorname,
          flavor: { name: args.flavorname, egg: { eggname: args.eggname } }
        }
      },
      `{
        id
      }`
    );

    // data[0] for access first element in cursors array
    // but it always return only one cursor always 😉

    const cursor = await ctx.db.query.cursor(
      {
        where: {
          id: data[0].id
        }
      },
      info
    );

    return cursor;
  },

  // ###### FOR FETCH CURSORS ######

  cursors(parent, args, ctx, info) {
    // Checking user logged in or not if not then throw Error
    loggedIn(ctx);
    return ctx.db.query.cursors(
      {
        where: {
          flavor: {
            name: args.flavorname
          }
        }
      },
      info
    );
  }
};
