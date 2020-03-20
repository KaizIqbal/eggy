import React from "react";
import { useRouter } from "next/router";

import Page from "components/Page";

export default () => {
  // ---------------------------------------------------------------- HOOKS

  const {
    query: { username }
  } = useRouter();

  // ---------------------------------------------------------------- RENDER

  return (
    <Page title={`${username} - Eggy`}>
      <h1>👋 {username}</h1>
    </Page>
  );
};
