async function checkEggStatus(ctx: any, args: any) {
  const userId = ctx.request.userId;
  const egg = await ctx.db.exists.Egg({
    id: args.id,
    user: { id: userId }
  });

  if (!egg) {
    throw new Error(`Egg not found or you're not the publisher`);
  }
}

export { checkEggStatus };
