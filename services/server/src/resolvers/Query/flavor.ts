// Helper Functions
import isAuth from "../../utils/isAuth";

export const flavorQueries = {
  // ################################################ FOR FETCH SINGLE FLAVOR ################################################

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
  },
  RenderFlavors(parent, args, ctx, info) {
    // Checking user logged in or not if not then throw Error
    isAuth(ctx);

    // return Render flavors in egg
    return ctx.db.query.flavors(
      {
        where: {
          isRendered: true,
          egg: {
            id: args.eggId
          }
        }
      },
      info
    );
  }
};
