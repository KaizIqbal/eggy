import isAuth from "./isAuth";

async function checkFlavor(ctx: any, id: any, permissions: any) {
  const flavor = await ctx.db.query.flavor(
    { where: { id } },
    `{
      egg{
        user {
          id
        }
      }
    }`
  );

  // Checking user logged in or not if not then throw Error
  isAuth(ctx);

  // check they own the egg ,or  have a permission
  const ownsFlavor = flavor!.egg!.user!.id === ctx.request.userId;

  const hasPermissions = ctx.request.user.permissions.some(
    (permission: string) => permissions.includes(permission)
  );

  if (!ownsFlavor && !hasPermissions) {
    throw new Error("Access Denied!");
  }
}

export default checkFlavor;
