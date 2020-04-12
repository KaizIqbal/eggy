import React from "react";
import Page from "components/Page";
import { ResetPassword } from "components/auth";
import { useRouter } from "next/router";

export default () => {
  // ---------------------------------------------------------------- HOOKS

  const {
    query: { token }
  } = useRouter();

  // ---------------------------------------------------------------- RENDER

  return (
    <Page title="Eggy">
      <h1>Request for Reset Password</h1>
      <ResetPassword token={token} />
    </Page>
  );
};
