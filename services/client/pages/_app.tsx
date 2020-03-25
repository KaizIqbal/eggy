import App from "next/app";
import React from "react";

import { ApolloProvider } from "@apollo/react-hooks";
import { ThemeProvider } from "styled-components";
import { withApollo } from "lib/withApollo";

import { theme, GlobalStyle } from "components/styled/global";

class MyApp extends App<any> {
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Component {...pageProps} />
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}

export default withApollo(MyApp);
