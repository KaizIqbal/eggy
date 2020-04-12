// This file connect to remote Prisma DB and gives us to ability to Query in TS
import { Prisma } from "prisma-binding";

const db = new Prisma({
  typeDefs: "src/generated/prisma.graphql",
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET,
  debug: false
});

export default db;
