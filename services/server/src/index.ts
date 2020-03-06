//TODO environments variables
// require("dotenv").config({ path: "secret.env" });
import * as coockieParser from "cookie-parser";
import * as jwt from "jsonwebtoken";
import createServer from "./createServer";
import db from "./db";

const server = createServer();

server.express.use(coockieParser());
// Decode the token to get userId from each request
server.express.use((req: any, res, next) => {
  const { auth }: { auth: string } = req.cookies;
  if (auth) {
    const { _uid }: any = jwt.verify(auth, process.env.APP_SECRET);
    // put the userId onto the req for the further requests to access
    req.userId = _uid;
  }
  next();
});

// Middleware for populate user on each request
server.express.use(async (req: any, res, next) => {
  // if they arn't logged in skip this
  if (!req.userId) {
    return next();
  }
  const user = await db.query.user(
    {
      where: {
        id: req.userId
      }
    },
    "{id ,permissions, firstName,lastName ,email}"
  );
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
