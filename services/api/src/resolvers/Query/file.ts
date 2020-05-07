// Helper Functions
import isAuth from "../../utils/isAuth";

export const fileQueries = {
  file(parent, args, ctx, info) {
    // Checking user logged in or not if not then throw Error
    isAuth(ctx);

    return ctx.db.query.file(
      {
        where: {
          id: args.id
        }
      },
      info
    );
  },

  async bundle(parent, args, ctx, info) {
    const cursors = await ctx.db.query.cursors(
      {
        where: { flavor: { id: args.flavorId } }
      },
      `{
      url
    }`
    );
    console.log(cursors);
  }
};
