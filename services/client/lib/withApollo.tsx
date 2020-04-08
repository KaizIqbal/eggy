import React from "react";
import cookie from "cookie";
import Head from "next/head";
import Router from "next/router";
import jwtDecode from "jwt-decode";
import fetch from "isomorphic-unfetch";

import { onError } from "apollo-link-error";
import { ApolloClient } from "apollo-client";
import { WebSocketLink } from "apollo-link-ws";
import { ApolloLink, split } from "apollo-link";
import { setContext } from "apollo-link-context";
import { getMainDefinition } from "apollo-utilities";
import { createUploadLink } from "apollo-upload-client";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";

import { getAccessToken, setAccessToken } from "./accessToken";
import { endpoint, websocket_endpoint } from "./endpoint";
import { Redirect } from "./redirect";
import { isBrowser } from "./isBrowser";

const isServer = () => typeof window === "undefined";

/**
 * Creates and provides the apolloContext
 * to a next.js PageTree. Use it by wrapping
 * your PageComponent via HOC pattern.
 * @param {Function|Class} PageComponent
 * @param {Object} [config]
 * @param {Boolean} [config.ssr=true]
 */
export function withApollo(PageComponent: any, { ssr = true } = {}) {
  const WithApollo = ({ apolloClient, serverAccessToken, apolloState, ...pageProps }: any) => {
    if (!isServer() && !getAccessToken()) {
      setAccessToken(serverAccessToken);
    }
    const client = apolloClient || initApolloClient(apolloState);
    return <PageComponent {...pageProps} apolloClient={client} />;
  };

  if (process.env.NODE_ENV !== "production") {
    // Find correct display name
    const displayName = PageComponent.displayName || PageComponent.name || "Component";

    // Warn if old way of installing apollo is used
    if (displayName === "App") {
      console.warn("This withApollo HOC only works with PageComponents.");
    }

    // Set correct display name for devtools
    WithApollo.displayName = `withApollo(${displayName})`;
  }

  if (ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async (ctx: any) => {
      const {
        AppTree,
        ctx: { req, res }
      } = ctx;

      let serverAccessToken = "";

      if (isServer()) {
        const cookies = cookie.parse(req.headers.cookie);
        if (cookies._euid) {
          const response = await fetch(`${endpoint}/refresh_token`, {
            method: "POST",
            credentials: "include",
            headers: {
              cookie: "_euid=" + cookies._euid
            }
          });
          const data = await response.json();
          serverAccessToken = data.accessToken;
          setAccessToken(serverAccessToken);
        }
      }

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      const apolloClient = (ctx.ctx.apolloClient = initApolloClient({}, serverAccessToken));

      const pageProps = PageComponent.getInitialProps ? await PageComponent.getInitialProps(ctx) : {};

      // Only on the server
      if (typeof window === "undefined") {
        // When redirecting, the response is finished.
        // No point in continuing to render
        if (res && res.finished) {
          return {};
        }

        if (ssr) {
          try {
            // Run all GraphQL queries
            const { getDataFromTree } = await import("@apollo/react-ssr");
            await getDataFromTree(
              <AppTree
                pageProps={{
                  ...pageProps,
                  apolloClient
                }}
                apolloClient={apolloClient}
              />
            );
          } catch (error) {
            // Prevent Apollo Client GraphQL errors from crashing SSR.
            // Handle them in components via the data.error prop:
            // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
            console.error("Error while running `getDataFromTree`", error);
            if (error.message.includes("Not Authentiated")) {
              Redirect(ctx.ctx, "/signin");
            }
          }
        }

        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind();
      }

      // Extract query data from the Apollo store
      const apolloState = apolloClient.cache.extract();

      return {
        ...pageProps,
        apolloState,
        serverAccessToken
      };
    };
  }

  return WithApollo;
}

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 */
function initApolloClient(initState: any, serverAccessToken?: string) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (isServer()) {
    return createApolloClient(initState, serverAccessToken);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    // setAccessToken(cookie.parse(document.cookie).test);
    apolloClient = createApolloClient(initState);
  }

  return apolloClient;
}

/**
 * Creates and configures the ApolloClient
 * @param  {Object} [initialState={}]
 * @param  {Object} config
 */
function createApolloClient(initialState = {}, serverAccessToken?: string) {
  const uploadLink = createUploadLink({
    uri: endpoint,
    credentials: "include",
    fetch
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) => {
        console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
        if (isBrowser && message.includes("Not Authentiated")) {
          Router.replace("/signin");
        }
      });
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

  const refreshLink = new TokenRefreshLink({
    accessTokenField: "accessToken",
    isTokenValidOrUndefined: () => {
      const token = getAccessToken();

      if (!token) {
        return true;
      }

      try {
        const { exp } = jwtDecode(token);
        if (Date.now() >= exp * 1000) {
          return false;
        } else {
          return true;
        }
      } catch {
        return false;
      }
    },
    fetchAccessToken: () => {
      return fetch(`${endpoint}/refresh_token`, {
        method: "POST",
        credentials: "include"
      });
    },
    handleFetch: accessToken => {
      setAccessToken(accessToken);
    },
    handleError: err => {
      console.warn("Your refresh token is invalid. Try to relogin");
      console.error(err);
    }
  });

  const authLink = setContext((_request, { headers }) => {
    const token = isServer() ? serverAccessToken : getAccessToken();
    return {
      headers: {
        ...headers,
        authorization: token ? `bearer ${token}` : ""
      }
    };
  });

  // Create a WebSocket link:
  const wsLink: any = () => {
    const token = isServer() ? serverAccessToken : getAccessToken();
    return isBrowser
      ? // if you instantiate in the server, the error will be thrown
        new WebSocketLink({
          uri: websocket_endpoint,
          options: {
            lazy: true,
            reconnect: true,
            connectionParams: {
              headers: {
                Authorization: token ? `bearer ${token}` : ""
              }
            }
          }
        })
      : null;
  };

  // using the ability to split links, you can send data to each link
  // depending on what kind of operation is being sent
  const link = isBrowser
    ? //only create the split in the browser split based on operation type
      split(
        // split based on operation type
        ({ query }) => {
          const definition = getMainDefinition(query);
          return definition.kind === "OperationDefinition" && definition.operation === "subscription";
        },
        wsLink,
        authLink
      )
    : authLink;

  return new ApolloClient({
    ssrMode: typeof window === "undefined", // Disables forceFetch on the server (so queries are only run once)
    link: ApolloLink.from([link, uploadLink, refreshLink, errorLink]),
    cache: new InMemoryCache().restore(initialState)
  });
}
