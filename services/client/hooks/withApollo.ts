import ApolloClient, { InMemoryCache } from "apollo-boost";
import withApollo from "next-with-apollo";
import { codesandbox_server_endpoint } from "../config";

export default withApollo(
  ({ initialState, headers }) =>
    new ApolloClient({
      cache: new InMemoryCache().restore(initialState || {}),
      uri:
        process.env.NODE_ENV === "development"
          ? codesandbox_server_endpoint
          : codesandbox_server_endpoint,
      request: operation => {
        operation.setContext({
          fetchOptions: {
            credentials: "include"
          },
          headers
        });
      }
    })
);
