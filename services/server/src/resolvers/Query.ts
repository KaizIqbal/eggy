import { forwardTo } from "prisma-binding";
const { hasPermission } = require("../utils/hasPermission");
const { loggedIn } = require("../utils/loggedIn");

const Query = {
  egg: forwardTo("db"),
  flavor: forwardTo("db"),
  cursors(parent, args, ctx, info) {
    // Checking user logged in or not if not then throw Error
    loggedIn(ctx);
    return ctx.db.query.cursors(
      {
        where: {
          egg: {
            eggname: args.eggname
          }
        }
      },
      info
    );
  },
  flavors(parent, args, ctx, info) {
    // Checking user logged in or not if not then throw Error
    loggedIn(ctx);

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
  userEggsConnection(parent, args, ctx, info) {
    // Checking user logged in or not if not then throw Error
    loggedIn(ctx);

    return ctx.db.query.eggsConnection(
      {
        where: {
          user: { id: ctx.request.userId }
        },
        ...args
      },
      info
    );
  },
  publishedEggsConnection(parent, args, ctx, info) {
    return ctx.db.query.eggsConnection(
      {
        where: {
          isPublished: true
        },
        ...args
      },
      info
    );
  },
  me(parent, args, ctx, info) {
    // check if there is current user ID
    if (!ctx.request.userId) {
      return null;
    }
    return ctx.db.query.user(
      {
        where: { id: ctx.request.userId }
      },
      info
    );
  },
  users(parent, args, ctx, info) {
    // 1. If they are logged In
    if (!ctx.request.userId) {
      throw new Error("You must be logged in!");
    }

    // 2. Check if user has the permission to query all the users
    hasPermission(ctx.request.user, ["ADMIN", "PERMISSIONUPDATE"]);

    // 3. If they do,Query all users
    return ctx.db.query.users({}, info);
  }
};

export default Query;
