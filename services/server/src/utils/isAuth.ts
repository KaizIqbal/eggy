function isAuth(ctx: any) {
  if (!ctx.request.userId) {
    throw new Error("Not Authentiated \n Please `Signin` to Continue");
  }
}

export default isAuth;
