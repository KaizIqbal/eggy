// Helper Functions
import checkFlavorName from "../../utils/checkFlavorName";
import checkEgg from "../../utils/checkEgg";
import checkFlavor from "../../utils/checkFlavor";

export const flavrorMutations = {
  // ################################################ CREATE FLAVOR ################################################

  async createFlavor(parent, args, ctx, info) {
    // Checking flavor's name contains special symbols
    checkFlavorName(args);

    // seprate EggId and flavour data
    const eggId = args.eggId;
    delete args.eggId;

    // Checking user has permissions or not if not then throw Error
    await checkEgg(ctx, eggId, ["ADMIN", "FLAVORCREATE"]);

    return ctx.db.mutation.createFlavor(
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
  },

  // ################################################ UPDATE FLAVOR ################################################

  async renameFlavor(parent, args, ctx, info) {
    // Remove all Special Character
    args.name = args.name.trim();
    args.name = args.name.replace(/[^\w\s]/gi, "");

    const flavorId = args.id;
    delete args.id;

    // Checking user has permissions or not if not then throw Error
    await checkFlavor(ctx, flavorId, ["ADMIN", "FLAVORUPDATE"]);

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

  // ################################################ DELETE FLAVOR ################################################

  async downloadFalvor(parent, args, ctx, info) {
    // Download response
    return {
      key: "test",
      link: "test",
      expiry: "test",
      filename: "test",
      size: "test"
    };
  },

  async deleteFlavor(parent, args, ctx, info) {
    // Checking user has permissions or not if not then throw Error
    await checkFlavor(ctx, args.id, ["ADMIN", "FLAVORDELETE"]);

    // Delete flavor by id
    return ctx.db.mutation.deleteFlavor({ where: { id: args.id } }, info);
  },

  async confirmFlavor(parent, args, ctx, info) {
    // Delete flavor by id
    return ctx.db.mutation.updateFlavor(
      { where: { id: args.id }, data: { isConfirmed: true } },
      info
    );
  },

  async denyFlavor(parent, args, ctx, info) {
    // Delete flavor by id
    return ctx.db.mutation.updateFlavor(
      { where: { id: args.id }, data: { isConfirmed: false } },
      info
    );
  }
};
