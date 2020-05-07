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
    let [cursor] = await ctx.db.query.cursors(
      {
        where: { flavor: { id: args.flavorId } }
      },
      `{
        render{
          key
        }
    }`
    );

    cursor = JSON.parse(JSON.stringify(cursor));
    let [key] = cursor.render.map(obj => obj.key);
    key = key.split("/raw")[0];

    // Get all cursors render path
    console.log(key);

    // execute lambda function
  }
};
