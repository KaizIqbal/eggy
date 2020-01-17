//TODO enable for local development
// require("dotenv").config({ path: "secret.env" });
import * as coockieParser from "cookie-parser";
import * as jwt from "jsonwebtoken";
import createServer from "./createServer";

const server = createServer();

server.express.use(coockieParser());
// Decode the token to get userId from each request
server.express.use((req: any, res, next) => {
  const { auth }: { auth: any } = req.cookies;
  if (auth) {
    const { _uid } = jwt.verify(auth, process.env.APP_SECRET);
    // put the userId onto the req for the further requests to access
    req.userId = _uid;
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
  ({ port }) => {
    console.log(`🚀 Server running on http://localhost:${port}`);
  }
);
