import React from "react";

import { Button } from "components/styled";

interface IProps {
  id: string;
}

export const DownloadFlavor: React.FC<IProps> = ({ id }) => {
  // ---------------------------------------------------------------- HOOKS
  // ---------------------------------------------------------------- RENDER

  return (
    <>
      <Button>{id}</Button>
    </>
  );
};
