import React from "react";

import { CursorsDocument, useDeleteFileMutation } from "generated/graphql";
import { Button } from "components/styled";

interface IProps {
  fileId: string;
  flavorId: string;
}

export const DeleteFile: React.FC<IProps> = ({ fileId, flavorId }) => {
  // ---------------------------------------------------------------- HOOKS

  const [deleteFile, { loading, error }] = useDeleteFileMutation({
    variables: { fileId },
    refetchQueries: [{ query: CursorsDocument, variables: { flavorId } }]
  });

  // ---------------------------------------------------------------- RENDER

  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <Button onClick={() => deleteFile()}>Remov{loading ? "ing" : "e"}</Button>
    </>
  );
};
