const Mutation = {
  async createEgg(parent, args, ctx, info) {
    // TODO check it logged In
    const egg = await ctx.db.mutation.createEgg(
      {
        data: {
          ...args
        }
      },
      info
    );

    // console.log(egg);

    return egg;
  },

  updateEgg(parent, args, ctx, info) {
    // first take the copy of updates
    const updates = { ...args };

    // delete id from updates
    delete updates.id;

    // run the update method
    return ctx.db.mutation.updateEgg(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    );
  }
};

export default Mutation;
