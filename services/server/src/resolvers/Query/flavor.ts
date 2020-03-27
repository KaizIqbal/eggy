// Helper Functions
import isAuth from "../../utils/isAuth";

export const flavorQueries = {
  // ################################################ FOR FETCH SINGLE FLAVOR ################################################

  async flavor(parent, args, ctx, info) {
    // Checking user logged in or not if not then throw Error
    isAuth(ctx);

    const flavor = await ctx.db.query.flavor({
      where: {
        id: args.id
      }
    });

    console.log(flavor);
    return flavor;
  },

  // ################################################ FOR FETCH FLAVORS IN EGG ################################################

  flavors(parent, args, ctx, info) {
    // Checking user logged in or not if not then throw Error
    isAuth(ctx);

    // return flavors in egg
    return ctx.db.query.flavors(
      {
        where: {
          egg: {
            id: args.eggId
          }
        }
      },
      info
    );
  }
};
