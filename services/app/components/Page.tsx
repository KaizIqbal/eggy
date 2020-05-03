import React from "react";
import Head from "next/head";
import { Header } from "components/Header";
import { UserContextProvider } from "contexts/UserContext";

type Props = {
  title?: string;
};

const Page: React.FC<Props> = ({ children, title = "Eggy" }) => (
  <div>
    <Head>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
      />
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />

      <link
        href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;500;700&display=swap"
        rel="stylesheet"
      />

      <title>{title}</title>
    </Head>

    <UserContextProvider>
      <Header />
      {children}
    </UserContextProvider>
  </div>
);

export default Page;
