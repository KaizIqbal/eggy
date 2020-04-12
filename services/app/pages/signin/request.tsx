import React from "react";
import Page from "components/Page";
import { ResetPasswordRequest } from "components/auth";

export default () => {
  return (
    <Page title="Eggy">
      <h1>Request for Reset Password</h1>
      <ResetPasswordRequest />
    </Page>
  );
};
