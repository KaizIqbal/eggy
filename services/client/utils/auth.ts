import Router from "next/router";
import nextCookie from "next-cookies";

// Contains all routes
import paths from "../paths";

export const auth = ctx => {
  const { auth } = nextCookie(ctx);
  if (ctx.req && !auth) {
    ctx.res.writeHead(302, { Location: paths.signin });
    ctx.res.end();
    return;
  }

  if (!auth) {
    Router.push(paths.signin);
  }

  return auth;
};
