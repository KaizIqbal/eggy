export const Subscription = {
  fileUploaded: {
    subscribe: (parent, args, ctx, info) => {
      console.log("CHECKCHECK");
      return ctx.db.subscription.file(
        { where: { mutation_in: ["CREATED"] } },
        info
      );
    }
  }
};
