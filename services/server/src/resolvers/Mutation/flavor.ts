const { loggedIn } = require("../../utils/loggedIn");
const { checkFlavorName } = require("../../utils/checkFlavorName");

export const flavrorMutations = {
  // ###### CREATE FLAVOR ######

  async createFlavor(parent, args, ctx, info) {
    // Checking user logged in or not if not then throw Error
    loggedIn(ctx);

    // Checking flavor's name contains special symbols
    checkFlavorName(args);

    // seprate EggId and flavour data
    const eggId = args.eggId;
    delete args.eggId;

    const flavor = await ctx.db.mutation.createFlavor(
      {
        data: {
          // Provide relationship between Flavour and Cursor
          egg: {
            connect: {
              id: eggId
            }
          },
          ...args
        }
      },
      info
    );

    return flavor;
  },

  // ###### UPDATE FLAVOR ######

  updateFlavor(parent, args, ctx, info) {
    // Checking user logged in or not if not then throw Error
    loggedIn(ctx);

    // Checking flavor's name contains special symbols
    checkFlavorName(args);

    // first take copy in updates
    const flavorId = args.id;
    delete args.id;

    // return updated flavor by id
    return ctx.db.mutation.updateFlavor(
      {
        where: {
          id: flavorId
        },
        data: { ...args }
      },
      info
    );
  },

  // ###### DELEtE FLAVOR ######

  deleteFlavor(parent, args, ctx, info) {
    // Checking user logged in or not if not then throw Error
    loggedIn(ctx);

    // Delete flavor by id
    return ctx.db.mutation.deleteFlavor({ where: { id: args.id } }, info);
  }
};
