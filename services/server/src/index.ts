//TODO enable for local development
// require("dotenv").config({ path: "secret.env" });
import * as coockieParser from "cookie-parser";
import createServer from "./createServer";
import db from "./db";

const server = createServer();

server.express.use(coockieParser());
// TODO use express middleware to produce current user

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
