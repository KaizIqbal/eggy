import { forwardTo } from "prisma-binding";
const { hasPermission } = require("../utils/hasPermission");

const Query = {
  egg: forwardTo("db"),
  eggsConnection: forwardTo("db"),
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
