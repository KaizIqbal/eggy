import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient, NormalizedCacheObject } from "apollo-boost";
import App from "next/app";
import React from "react";
import Page from "../components/Page";
import withApollo from "../hooks/withApollo";

interface IMyAppProps {
  apollo: ApolloClient<NormalizedCacheObject>;
}

class MyApp extends App<IMyAppProps> {
  render() {
    // instead of creating a client here, we use the rehydrated apollo client provided by our own withApollo provider.
    const { Component, pageProps, apollo } = this.props;

    return (
      <React.Fragment>
        <ApolloProvider client={apollo}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </ApolloProvider>
      </React.Fragment>
    );
  }
}

export default withApollo(MyApp);
