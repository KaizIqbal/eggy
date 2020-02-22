// Helper Functions
import loggedIn from "../../utils/loggedIn";

export const flavorQueries = {
  // ################################################ FOR FETCH SINGLE FLAVOR ################################################

  async flavor(parent, args, ctx, info) {
    // Checking user logged in or not if not then throw Error
    loggedIn(ctx);

    //get one cursor id by cursors
    const data = await ctx.db.query.flavors(
      {
        where: {
          name: args.flavorname,
          egg: { eggname: args.eggname }
        }
      },
      `{
        id
      }`
    );

    // data[0] for access first element in flavors array
    // but it always return only one flavor always 😉

    const flavor = await ctx.db.query.flavor(
      {
        where: {
          id: data[0].id
        }
      },
      info
    );

    return flavor;
  },

  // ################################################ FOR FETCH FLAVORS IN EGG ################################################

  flavors(parent, args, ctx, info) {
    // Checking user logged in or not if not then throw Error
    loggedIn(ctx);

    // return flavors in egg
    return ctx.db.query.flavors(
      {
        where: {
          egg: {
            eggname: args.eggname
          }
        }
      },
      info
    );
  }
};
