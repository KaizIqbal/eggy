import { forwardTo } from "prisma-binding";

// Helper Functions
import loggedIn from "../../utils/loggedIn";

export const eggQueries = {
  // ###### FOR FETCH SINGLE EGG ######

  egg: forwardTo("db"),

  // ###### FOR FETCH USER'S EGGS ######

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

  // ###### FOR FETCH PUBLIC/PUBLISH EGGS ######

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
  }
};
