import nextCookie from "next-cookies";
import paths from "../paths";

export const signinAuth = (ctx: any) => {
  const { auth } = nextCookie(ctx);
  if (ctx.req && auth) {
    ctx.res.writeHead(302, { Location: paths.dashboard });
    ctx.res.end();
    ctx.res.finished = true;
    return;
  }

  return auth;
};

export const dashboardAuth = (ctx: any) => {
  const { auth } = nextCookie(ctx);

  if (ctx.req && !auth) {
    ctx.res.writeHead(302, { Location: paths.signin });
    ctx.res.end();
    ctx.res.finished = true;
    return;
  }

  return auth;
};

export const workshopAuth = (ctx: any, eggname: string) => {
  const { auth } = nextCookie(ctx);
  if (ctx.req && !auth) {
    ctx.res.writeHead(302, { Location: `/egg/${eggname}` });
    ctx.res.end();
    ctx.res.finished = true;
    return;
  }

  return auth;
};
