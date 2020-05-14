import { forwardTo } from "prisma-binding";

// Helper Functions
import isAuth from "../../utils/isAuth";

export const eggQueries = {
  egg: forwardTo("db"),

  userBasket(parent, args, ctx, info) {
    // Checking user logged in or not if not then throw Error
    isAuth(ctx);

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

  publicBasket(parent, args, ctx, info) {
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

  async isEggAccessible(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      return { access: false };
    }

    const egg = await ctx.db.query.egg(
      {
        where: {
          eggname: args.eggname
        }
      },
      `{
        id
        user {
          id
        }
      }`
    );

    if (egg.user.id !== ctx.request.userId) {
      return { access: false };
    }

    return { access: true };
  }
};
