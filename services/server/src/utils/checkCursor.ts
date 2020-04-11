import isAuth from "./isAuth";

async function checkCursor(ctx: any, id: any, permissions: any) {
  // Checking user logged in or not if not then throw Error
  isAuth(ctx);

  const cursor = await ctx.db.query.cursor(
    { where: { id } },
    `{
      flavor {
        egg {
          user {
            id
          }
        }
      }
    }`
  );

  console.log();

  // check they own the egg ,or  have a permission
  const ownsCursor = cursor!.flavor!.egg!.user!.id === ctx.request.userId;

  const hasPermissions = ctx.request.user.permissions.some(
    (permission: string) => permissions.includes(permission)
  );

  if (!ownsCursor && !hasPermissions) {
    throw new Error("Access Denied!");
  }
}

export default checkCursor;
