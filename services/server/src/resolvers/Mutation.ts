const Mutation = {
  async createEgg(parent, args, ctx, info) {
    //TODO check it logged In
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
  }
};

export default Mutation;
