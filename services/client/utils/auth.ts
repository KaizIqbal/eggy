import Router from "next/router";
import nextCookie from "next-cookies";
import paths from "../paths";

export const dashboardAuth = ctx => {
  const { auth } = nextCookie(ctx);
  if (ctx.req && !auth) {
    ctx.res.writeHead(302, { Location: paths.signin });
    ctx.res.end();
    ctx.res.finished = true;
    return;
  }

  if (!auth) {
    Router.push(paths.signin);
  }

  return auth;
};

export const workshopAuth = (ctx, eggname) => {
  const { auth } = nextCookie(ctx);
  if (ctx.req && !auth) {
    ctx.res.writeHead(302, { Location: `/e/${eggname}` });
    ctx.res.end();
    ctx.res.finished = true;
    return;
  }

  if (!auth) {
    Router.push(paths.egg(eggname));
  }

  return auth;
};
