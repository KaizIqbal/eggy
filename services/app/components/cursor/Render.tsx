import React from "react";

import { useRenderCursorMutation, CursorsDocument } from "generated/graphql";

import { Button } from "components/styled";

interface IProps {
  id: string;
  flavorId: string;
}

export const RenderCursor: React.FC<IProps> = ({ id, flavorId, children }) => {
  // ---------------------------------------------------------------- HOOKS

  const [RenderCursor, { loading, error }] = useRenderCursorMutation({
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
      <Button onClick={() => RenderCursor()} disabled={loading}>
        {loading ? "Rendering" : children}
      </Button>
    </>
  );
};
