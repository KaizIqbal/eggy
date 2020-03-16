function isAuth(ctx: any) {
  if (!ctx.request.userId) {
    throw new Error("Not Authentiated");
  }
}

export default isAuth;
