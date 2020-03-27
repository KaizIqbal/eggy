import isAuth from "./isAuth";

async function checkFlavorName(ctx: any, id: any, permissions: any) {
  const egg = await ctx.db.query.egg(
    { where: { id } },
    `{
      id
      user {
        id
      }
    }`
  );

  // Checking user logged in or not if not then throw Error
  isAuth(ctx);

  // check they own the egg ,or  have a permission
  const ownsEgg = egg!.user!.id === ctx.request.userId;

  const hasPermissions = ctx.request.user.permissions.some(
    (permission: string) => permissions.includes(permission)
  );

  if (!ownsEgg && !hasPermissions) {
    throw new Error("You don't have permission to do that!");
  }
}

export default checkFlavorName;
