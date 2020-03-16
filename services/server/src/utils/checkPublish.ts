async function checkPublish(ctx: any, args: any) {
  const userId = ctx.request.userId;
  const eggExists = await ctx.db.exists.Egg({
    id: args.id,
    user: { id: userId }
  });
  if (!eggExists) {
    throw new Error(`Egg not found or you're not the publisher`);
  }
}

export default checkPublish;
