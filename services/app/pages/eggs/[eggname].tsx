import React from "react";
import { useRouter } from "next/router";

import Page from "components/Page";
import { EggPage } from "components/egg";

export default () => {
  // ---------------------------------------------------------------- HOOKS

  const {
    query: { eggname }
  } = useRouter();

  // ---------------------------------------------------------------- RENDER

  return (
    <Page>
      <EggPage eggname={eggname} />
    </Page>
  );
};
