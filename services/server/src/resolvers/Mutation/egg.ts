// Helper Functions
import isAuth from "../../utils/isAuth";
import checkEgg from "../../utils/checkEgg";
import { checkEggStatus } from "../../utils/checkEggStatus";
import generateEggName from "../../utils/generateEggName";

export const eggMutations = {
  // ################################################ CREATE EGG ################################################

  async createEgg(parent, args, ctx, info) {
    isAuth(ctx);

    // Remove unnecessary space from title
    // example "   This is   a  DOG     " =>  "This is a DOG"
    args.title = args.title.trim();
    args.title = args.title.replace(/  +/g, " ");

    // Generating unique eggname based on `title`
    generateEggName(args);

    // deconstruct platforms and delete from args
    const platforms = args.platforms;
    delete args.platforms;

    const egg = await ctx.db.mutation.createEgg(
      {
        data: {
          // Provide relationship between User and Egg
          user: {
            connect: {
              id: ctx.request.userId
            }
          },
          platforms: {
            set: platforms
          },
          ...args
        }
      },
      info
    );

    return egg;
  },

  // ################################################ UPDATE EGG ################################################

  async updateEgg(parent, args, ctx, info) {
    await checkEgg(ctx, args.id, ["ADMIN", "EGGUPDATE"]);

    // first take copy in updates
    const updates = { ...args };

    // remove id from updates
    delete updates.id;

    // deconstruct platforms and delete from updates
    const platforms = updates.platforms;
    delete updates.platforms;

    // run the update Query
    return ctx.db.mutation.updateEgg(
      {
        data: {
          platforms: {
            set: platforms
          },
          ...updates
        },
        where: {
          id: args.id
        }
      },
      info
    );
  },

  // ################################################ RENAME EGG ################################################

  async renameEgg(parent, args, ctx, info) {
    await checkEgg(ctx, args.id, ["ADMIN", "EGGUPDATE"]);

    const eggId = args.id;
    delete args.id;

    // Remove unnecessary space from title
    // example "   This is   a  DOG     " =>  "This is a DOG"
    args.title = args.title.trim();
    args.title = args.title.replace(/  +/g, " ");

    // Generating unique eggname based on `title`
    generateEggName(args);

    // return => updated Egg

    return ctx.db.mutation.updateEgg(
      {
        data: { ...args },
        where: {
          id: eggId
        }
      },
      info
    );
  },

  // ################################################ DELETE EGG ################################################

  async deleteEgg(parent, args, ctx, info) {
    checkEgg(ctx, args.id, ["ADMIN", "EGGDELETE"]);

    // 3.Delete Egg
    return ctx.db.mutation.deleteEgg({ where: { id: args.id } }, info);
  },

  // ################################################ PUBLISH EGG ################################################

  async publish(parent, args, ctx, info) {
    // Checking user logged in or not if not then throw Error
    isAuth(ctx);
    await checkEggStatus(ctx, args);

    return ctx.db.mutation.updateEgg(
      {
        where: { id: args.id },
        data: { isPublished: true }
      },
      info
    );
  },

  // ################################################ UNPUBLISH EGG ################################################

  async unPublish(parent, args, ctx, info) {
    // Checking user logged in or not if not then throw Error
    isAuth(ctx);
    await checkEggStatus(ctx, args);

    return ctx.db.mutation.updateEgg(
      {
        where: { id: args.id },
        data: { isPublished: false }
      },
      info
    );
  }
};
