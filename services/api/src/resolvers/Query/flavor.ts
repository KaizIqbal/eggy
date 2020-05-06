// Helper Functions
import isAuth from "../../utils/isAuth";

export const flavorQueries = {
  flavor(parent, args, ctx, info) {
    // Checking user logged in or not if not then throw Error
    isAuth(ctx);

    return ctx.db.query.flavor(
      {
        where: {
          id: args.id
        }
      },
      info
    );
  },

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
