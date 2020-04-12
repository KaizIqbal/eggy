import React from "react";
import { useRouter } from "next/router";

import Page from "components/Page";

export default () => {
  // ---------------------------------------------------------------- HOOKS

  const {
    query: { query }
  } = useRouter();

  // ---------------------------------------------------------------- RENDER

  return (
    <Page title={`${query} - Eggy Search`}>
      <h1>Results For {query}</h1>
    </Page>
  );
};
