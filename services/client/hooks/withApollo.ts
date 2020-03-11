import ApolloClient from "apollo-client";
import withApollo from "next-with-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";
import { createUploadLink } from "apollo-upload-client";

const uri =
  process.env.NODE_ENV === "development"
    ? "https://1fst7.sse.codesandbox.io"
    : "https://1fst7.sse.codesandbox.io";

const link = createUploadLink({
  fetchOptions: {
    credentials: "include"
  },
  uri: uri
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers
    }
  };
});

export default withApollo(
  ({ initialState }) =>
    new ApolloClient({
      link: authLink.concat(link),
      cache: new InMemoryCache().restore(initialState || {}),
      ssrMode: true
    })
);
