//TODO enable for local development
// require("dotenv").config({ path: "secret.env" });
import * as coockieParser from "cookie-parser";
import createServer from "./createServer";
import * as jwt from "jsonwebtoken";
import db from "./db";

const server = createServer();

server.express.use(coockieParser());
// Decode the token to get userId from each request
server.express.use((req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);

    // put the userId onto the req for the further requests to access
    req.userId = userId;
  }
  next();
});
server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL
    }
  },
  deets => {
    console.log(`🚀 Server running on http://localhost:${deets.port}`);
  }
);
