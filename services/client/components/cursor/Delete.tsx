import React from "react";

import { useDeleteCursorMutation, CursorsDocument } from "generated/graphql";

import { Button } from "components/styled";

interface IProps {
  id: string;
  flavorId: string;
}

export const DeleteCursor: React.FC<IProps> = ({ id, flavorId }) => {
  // ---------------------------------------------------------------- HOOKS

  const [DeleteCursor, { error }] = useDeleteCursorMutation({
    variables: { id },
    refetchQueries: [
      {
        query: CursorsDocument,
        variables: { flavorId }
      }
    ]
  });

  // ---------------------------------------------------------------- RENDER

  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <Button onClick={() => DeleteCursor()}>Delete</Button>
    </>
  );
};
