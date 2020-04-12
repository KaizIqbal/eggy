// Helper Functions
import isAuth from "../../utils/isAuth";

export const fileQueries = {
  // ################################################ FOR FETCH FILE ################################################

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
  }
};
