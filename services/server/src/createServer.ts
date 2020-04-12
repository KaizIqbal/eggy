import { GraphQLServer } from "graphql-yoga";
import db from "./db";
import { resolvers } from "./resolvers";

function createServer() {
  return new GraphQLServer({
    typeDefs: "src/schema.graphql",
    resolvers: {
      ...resolvers
    },
    resolverValidationOptions: {
      requireResolversForResolveType: false
    },
    context: req => ({ ...req, db })
  });
}

export default createServer;
