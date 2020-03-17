import * as React from "react";
import Head from "next/head";
import { Header } from "components/Header";

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
      <title>{title}</title>
    </Head>
    <Header />
    {children}
  </div>
);

export default Page;
