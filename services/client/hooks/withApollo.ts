import ApolloClient, { InMemoryCache } from "apollo-boost";
import withApollo from "next-with-apollo";
import { endpoint } from "../config";

export default withApollo(
  ({ initialState }) =>
    new ApolloClient({
      uri: process.env.NODE_ENV === "development" ? endpoint : endpoint,
      cache: new InMemoryCache().restore(initialState || {})
    })
);
