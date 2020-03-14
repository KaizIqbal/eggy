function hasPermission(user, permissionsNeeded) {
  const matchedPermissions = user.permissions.filter(permissionTheyHave =>
    permissionsNeeded.includes(permissionTheyHave)
  );
  if (!matchedPermissions.length) {
    let error: string = null;

    // Throw error based on env
    error =
      process.env.NODE_ENV === "development"
        ? `You do not have sufficient permissions
    : ${permissionsNeeded}
    You Have:
    ${user.permissions}
    `
        : "You do not have sufficient permissions";

    throw new Error(error);
  }
}

export default hasPermission;
