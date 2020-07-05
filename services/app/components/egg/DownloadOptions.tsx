import React from "react";

import { Flavor } from "generated/graphql";

import { Button } from "components/styled";

interface IProps {
  flavors: Array<Flavor>;
}

export const DownloadOptions: React.FC<IProps> = ({ flavors }) => {
  // ---------------------------------------------------------------- HOOKS
  // ---------------------------------------------------------------- RENDER

  console.log(flavors);

  return (
    <>
      <Button>dsd</Button>
    </>
  );
};
