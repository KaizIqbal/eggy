import React from "react";
import Page from "components/Page";
import { Signin } from "components/auth";
import Link from "next/link";

export default () => {
  return (
    <Page title="Signin - Eggy">
      <h1>Signin</h1>
      <Signin />
      <Link href="/signin/request">
        <a> Forget Password</a>
      </Link>
    </Page>
  );
};
