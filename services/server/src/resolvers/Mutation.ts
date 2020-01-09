import Query from "./Query";

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
  },
  updateEgg(parent, args, ctx, info) {
    // first take copy in updates
    const updates = { ...args };
    // remove id from updates
    delete updates.id;
    // run the update Query
    return ctx.db.mutation.updateEgg(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    );
  },
  async deleteEgg(parent, args, ctx, info) {
    const where = { id: args.id };
    // 1.find egg
    // const egg = await ctx.db.Query.egg({ where }, `{id title}`);
    // 2.check they own the egg ,or  have a permission
    // TODO
    // 3.Delete It
    return ctx.db.mutation.deleteEgg({ where }, info);
  }
};

export default Mutation;
