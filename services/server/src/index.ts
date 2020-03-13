//TODO environments variables
// require("dotenv").config({ path: "secret.env" });
import * as coockieParser from "cookie-parser";
import { verify } from "jsonwebtoken";
import createServer from "./createServer";
import db from "./db";

const server = createServer();

server.express.use(coockieParser());

// // Decode the token to get userId from each request
// server.express.use((req: any, res, next) => {
//   const { auth }: { auth: string } = req.cookies;
//   if (auth) {
//     const { _uid }: any = jwt.verify(auth, process.env.APP_SECRET);
//     // put the userId onto the req for the further requests to access
//     req.userId = _uid;
//   }
//   next();
// });

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

  const user = await db.query.user({ where: { id: req.userId } });

  req.user = user;
  next();
});

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL
    }
  },
  ({ port }) => {
    console.log(`🚀 Server running on http://localhost:${port}`);
  }
);
