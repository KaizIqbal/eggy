import React from "react";
import App from "next/app";
import Head from "next/head";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { ApolloProvider } from "@apollo/react-hooks";
import withApollo from "../hooks/withApollo";
import { ApolloClient, NormalizedCacheObject } from "apollo-boost";
import { Page } from "../components";

// ##### GLOBAL THEME #####
// TODO:Edit Global Theme
export interface ITheme {
  niceBlack: string;
}

export interface IThemeWrapper {
  theme: ITheme;
}

export const theme: ITheme = {
  niceBlack: "#001F3F"
};

const GlobalStyle = createGlobalStyle<IThemeWrapper>`
  body {
    margin: 0 auto;
    color: ${props => props.theme.niceBlack}; 
  }
`;

// ##### COMPONENT PROPS TYPE #####
// since "apollo" isn't a native Next.js prop we have to declare it's type.
interface IProps {
  apollo: ApolloClient<NormalizedCacheObject>;
}

// ##### COMPONENT #####
// adds our custom props interface to the generic App base class.
class MyApp extends App<IProps> {
  // This is expose query to user
  static async getInitialProps({ Component, ctx }) {
    let pageProps = { query: String };

    if (Component.getInitialProps) {
      pageProps = Component.getInitialProps(ctx);
    }
    pageProps.query = ctx.query;
    return { pageProps };
  }

  // ##### RENDER #####
  render() {
    // instead of creating a client here, we use the rehydrated apollo client provided by our own withApollo provider.
    const { Component, pageProps, apollo } = this.props;

    return (
      <React.Fragment>
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
          <link
            rel="shortcut icon"
            href="/public/favicon.ico"
            type="image/x-icon"
          />
          <title>Eggy</title>
        </Head>

        {/* adds the apollo provider to provide it's children with the apollo scope. */}
        <ApolloProvider client={apollo}>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Page>
              <Component {...pageProps} />
            </Page>
          </ThemeProvider>
        </ApolloProvider>
      </React.Fragment>
    );
  }
}

// before exporting our App we wrapp it with our own withApollo provider to have access to the our rehydrated apollo client.
export default withApollo(MyApp);
