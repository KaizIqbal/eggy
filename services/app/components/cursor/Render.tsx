import React from "react";

import { useRenderCursorMutation, CursorsDocument } from "generated/graphql";

import { Button } from "components/styled";

interface IProps {
  id: string;
  flavorId: string;
}

export const RenderCursor: React.FC<IProps> = ({ id, flavorId }) => {
  // ---------------------------------------------------------------- HOOKS

  const [RenderCursor, { error }] = useRenderCursorMutation({
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
      <Button onClick={() => RenderCursor()}>Render</Button>
    </>
  );
};
