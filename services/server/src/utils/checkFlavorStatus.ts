async function checkFalvorStatus(ctx: any, args: any) {
  const userId = ctx.request.userId;
  const flavor = await ctx.db.exists.Flavor({
    id: args.id,
    egg: {
      user: { id: userId }
    }
  });

  if (!flavor) {
    throw new Error("Falvor not Found Or You aren't Publisher");
  }
}

export { checkFalvorStatus };
