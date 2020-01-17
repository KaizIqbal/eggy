import * as jwt from "jsonwebtoken";

async function authoriaztion(user: any, ctx: any) {
  const token = await jwt.sign({ _uid: user.id }, process.env.APP_SECRET);
  // set jwt token as cookie on the response
  ctx.response.cookie("auth", token, {
    domain: process.env.DOMAIN,
    secure: true,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365
  });
}

export default authoriaztion;
