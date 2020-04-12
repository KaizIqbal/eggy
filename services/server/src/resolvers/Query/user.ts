// Helper Functions
import hasPermission from "../../utils/hasPermission";

export const userQueries = {
  // ################################################ FOR FETCH CURRENT USER ################################################

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

  // ################################################ FOR FETCH ALL USERS ################################################

  users(parent, args, ctx, info) {
    // 1. If they are logged In
    if (!ctx.request.userId) {
      throw new Error("You must be logged in!");
    }

    // 2. Check if user has the permission to query all the users
    hasPermission(ctx.request.user, ["ADMIN", "PERMISSIONUPDATE"]);

    // 3. If they do,Query all users
    return ctx.db.query.users({}, info);
  },

  async isUserAvailable(parent, args, ctx, info) {
    if (!args.username.startsWith("@")) {
      return { available: false };
    }

    const user = await ctx.db.query.user({ where: { username: args.username } });

    if (!user) {
      return { available: false };
    }

    return { available: true };
  }
};
