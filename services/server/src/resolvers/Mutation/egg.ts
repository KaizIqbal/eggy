import * as shortid from "shortid";
// Helper Functions
import loggedIn from "../../utils/loggedIn";
import checkPublish from "../../utils/checkPublish";

export const eggMutations = {
  // ################################################ CREATE EGG ################################################

  async createEgg(parent, args, ctx, info) {
    // Checking user logged in or not if not then throw Error
    loggedIn(ctx);

    // generating "eggname" fron "title" and attach to the "args"
    // 1 => remove all special character expect white space
    // 2 => replce white spaces with "-"

    args.eggname = args.title.replace(/[^a-zA-Z0-9 ]/g, "");
    args.eggname = args.eggname.replace(/\s/g, "-");

    // deconstruct cursorType and delete from args
    const cursorTypes = args.cursorTypes;
    delete args.cursorTypes;

    const egg = await ctx.db.mutation.createEgg(
      {
        data: {
          // Provide relationship between User and Egg
          user: {
            connect: {
              id: ctx.request.userId
            }
          },
          cursorTypes: {
            set: cursorTypes
          },
          ...args
        }
      },
      info
    );

    return egg;
  },

  // ################################################ UPDATE EGG ################################################

  updateEgg(parent, args, ctx, info) {
    // Checking user logged in or not if not then throw Error
    loggedIn(ctx);

    // first take copy in updates
    const updates = { ...args };
    // remove id from updates
    delete updates.eggname;
    // run the update Query
    return ctx.db.mutation.updateEgg(
      {
        data: updates,
        where: {
          eggname: args.eggname
        }
      },
      info
    );
  },

  // ################################################ RENAME EGG ################################################

  async renameEgg(parent, args, ctx, info) {
    // Checking user logged in or not if not then throw Error
    loggedIn(ctx);

    const eggId = args.id;
    delete args.id;

    // generating "eggname" fron "title" and attach to the "args"
    // 1 => remove all special character expect white space
    // 2 => replace white spaces with "-"
    // 3 => generate id and add to end with prefix `-`

    args.eggname = args.title.replace(/[^a-zA-Z0-9 ]/g, "");
    args.eggname = args.eggname.replace(/\s/g, "-");

    args.eggname = args.eggname + "-" + shortid.generate();

    console.log(args);

    // return => updated Egg

    console.log(args);
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
    const where = { eggname: args.eggname };
    // 1.find egg
    const egg = await ctx.db.query.egg({ where }, `{id title user{ id }}`);

    // 2.check they own the egg ,or  have a permission
    const ownsEgg = egg.user.id === ctx.request.userId;

    // Checking user logged in or not if not then throw Error
    loggedIn(ctx);

    const hasDeletePermissions = ctx.request.user.permissions.some(
      (permission: string) => ["ADMIN", "EGGDELETE"].includes(permission)
    );

    if (!ownsEgg && !hasDeletePermissions) {
      throw new Error("You don't have permission to do that!");
    }

    // 3.Delete Egg
    return ctx.db.mutation.deleteEgg({ where }, info);
  },

  // ################################################ PUBLISH EGG ################################################

  async publish(parent, args, ctx, info) {
    // Checking user logged in or not if not then throw Error
    loggedIn(ctx);
    await checkPublish(ctx, args);

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
    loggedIn(ctx);
    await checkPublish(ctx, args);

    return ctx.db.mutation.updateEgg(
      {
        where: { id: args.id },
        data: { isPublished: false }
      },
      info
    );
  }
};
