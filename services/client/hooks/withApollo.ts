import ApolloClient from "apollo-client";
import withApollo from "next-with-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";
import { createUploadLink } from "apollo-upload-client";
import { getAccessToken } from "utils/accessToken";

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

const authLink = setContext((_: any, { headers }: any) => {
  const accessToken = getAccessToken();
  return {
    headers: {
      authorization: accessToken ? `Bearer ${accessToken}` : "",
      ...headers
    }
  };
});

export default withApollo(
  ({ initialState }: any) =>
    new ApolloClient({
      link: authLink.concat(link),
      cache: new InMemoryCache().restore(initialState || {}),
      ssrMode: true
    })
);
