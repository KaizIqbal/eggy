import isAuth from "./isAuth";

async function checkCursor(ctx: any, id: any, permissions: any) {
  const cursor = await ctx.db.query.cursor(
    { where: { id } },
    `{
      flavor{
        egg{
          user {
            id
          }
        }
      }
    }`
  );

  // Checking user logged in or not if not then throw Error
  isAuth(ctx);

  // check they own the egg ,or  have a permission
  const ownsFlavor = cursor!.flavor!.egg!.user!.id === ctx.request.userId;

  const hasPermissions = ctx.request.user.permissions.some(
    (permission: string) => permissions.includes(permission)
  );

  if (!ownsFlavor && !hasPermissions) {
    throw new Error("Access Denied!");
  }
}

export default checkCursor;
