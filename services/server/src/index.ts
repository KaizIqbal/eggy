//TODO environments variables
// require("dotenv").config({ path: "secret.env" });
import * as coockieParser from "cookie-parser";
import { verify } from "jsonwebtoken";
import createServer from "./createServer";
import db from "./db";
import * as cors from "cors";
import { createAccessToken, createRefreshToken } from "./utils/authorization";
import { sendRefreshToken } from "./utils/sendRefreshToken";

const server = createServer();

server.express.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
  })
);

server.express.use(coockieParser());

// Refreshing the `RefreshToken`
server.express.post("/refresh_token", async (req, res) => {
  const token = req.cookies._euid;

  if (!token) {
    return res.send({ ok: false, accessToken: "" });
  }

  let payload: any = null;
  try {
    payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
  } catch (error) {
    console.error(error);
    return res.send({ ok: false, accessToken: "" });
  }

  // Token is valid
  // fetch the user
  // Check the `refreshToken` version with user's tokenVersion
  // re-create the `refreshToken`
  // also We can send `accessToken` back

  const user = await db.query.user({ where: { id: payload.userId } });

  if (!user) {
    return res.send({ ok: false, accessToken: "" });
  }

  if (user.tokenVersion !== payload.tokenVersion) {
    // version not matched so token is invalid
    return res.send({ ok: false, accessToken: "" });
  }

  sendRefreshToken(res, createRefreshToken(user));

  return res.send({ ok: true, accessToken: createAccessToken(user) });
});

// Decode the token to get userId from each request
server.express.use((req: any, res, next) => {
  const authorization = req.headers["authorization"];

  if (authorization) {
    try {
      const token = authorization.split(" ")[1];
      const { userId }: any = verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.userId = userId;
    } catch (error) {
      return next();
    }
  }
  next();
});

// Middleware for populate user on each request
server.express.use(async (req: any, _, next) => {
  // if they arn't logged in skip this
  if (!req.userId) {
    return next();
  }

  const user = await db.query.user(
    { where: { id: req.userId } },
    `{
      id
      firstName
      lastName
      username
      email
      password
      permissions
      tokenVersion
    }`
  );
  req.user = user;
  next();
});

server.start(
  {
    cors: false
  },
  ({ port }) => {
    console.log(`🚀 Server running on http://localhost:${port}`);
  }
);
