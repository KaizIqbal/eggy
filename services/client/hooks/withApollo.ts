import ApolloClient from "apollo-client";
import withApollo from "next-with-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";
import { codesandbox_server_endpoint } from "../config";
import { createUploadLink } from "apollo-upload-client";

const link = createUploadLink({
  fetchOptions: {
    credentials: "include"
  },
  uri:
    // TODO:Server Endpoint
    process.env.NODE_ENV === "development"
      ? codesandbox_server_endpoint
      : codesandbox_server_endpoint
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers
    }
  };
});

export default withApollo(
  ({ initialState, headers }) =>
    new ApolloClient({
      link: authLink.concat(link),
      cache: new InMemoryCache().restore(initialState || {}),
      ssrMode: true
    })
);
