function loggedIn(ctx: any) {
  if (!ctx.request.userId) {
    throw new Error("You must logged in!");
  }
}

exports.loggedIn = loggedIn;
