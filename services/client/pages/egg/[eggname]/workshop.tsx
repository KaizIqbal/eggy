import React from "react";
import { useRouter } from "next/router";

import Page from "components/Page";

export default () => {
  // ---------------------------------------------------------------- HOOKS

  const {
    query: { eggname }
  } = useRouter();
  console.log(eggname);
  // ---------------------------------------------------------------- RENDER

  return (
    <Page>
      <h1> Workshop </h1>
    </Page>
  );
};
