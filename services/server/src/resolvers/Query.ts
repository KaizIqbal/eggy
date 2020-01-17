import { forwardTo } from "prisma-binding";

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
  }
};

export default Query;
