function loggedIn(ctx: any) {
  if (!ctx.request.userId) {
    throw new Error("You must logged in!");
  }
}

export default loggedIn;
