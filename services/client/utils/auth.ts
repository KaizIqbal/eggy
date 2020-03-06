import nextCookie from "next-cookies";
import paths from "../paths";

export const signinAuth = ctx => {
  const { auth } = nextCookie(ctx);
  if (ctx.req && auth) {
    ctx.res.writeHead(302, { Location: paths.dashboard });
    ctx.res.end();
    ctx.res.finished = true;
    return;
  }

  return auth;
};

export const dashboardAuth = ctx => {
  const { auth } = nextCookie(ctx);

  if (ctx.req && !auth) {
    ctx.res.writeHead(302, { Location: paths.signin });
    ctx.res.end();
    ctx.res.finished = true;
    return;
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

  return auth;
};
