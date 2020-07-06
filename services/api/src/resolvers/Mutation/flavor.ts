import * as path from "path";
// Helper Functions
import { invokeRenderLambdaFunction } from "../../aws/lambda/bundle";
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

  async downloadFlavor(parent, args, ctx, info) {
    const data = await ctx.db.query.flavor(
      { where: { id: args.id } },
      `{
      name
      egg {
        title
        eggname
        user {
          username
        }
      }
    }`
    );

    const key = path.join(
      data.egg.user.username,
      data.egg.eggname,
      data.name,
      "bitmaps"
    );

    const sizes = [24, 28, 32, 40, 48, 56, 65, 72, 80, 88, 96];
    const payload = {
      name: data.egg.title,
      key: key,
      sizes: sizes,
      type: args.type
    };

    let response: any = await invokeRenderLambdaFunction(
      JSON.stringify(payload)
    );

    let { Payload: downloadData } = response;
    downloadData = JSON.parse(downloadData);

    // If any error in lambda execution
    // @ts-ignore
    if (!downloadData.StatusCode === 200) {
      throw new Error("Ooops.Bundle server generating Exception");
    }

    // Download response
    return JSON.parse(downloadData.body);
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
