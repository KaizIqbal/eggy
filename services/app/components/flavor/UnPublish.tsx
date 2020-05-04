import React from "react";

import { useUnPublishFlavorMutation, FlavorDocument } from "generated/graphql";

import { Button } from "components/styled";

interface IProps {
  id: string;
  eggId: string;
}

export const UnPublishFlavor: React.FC<IProps> = ({ id, eggId }) => {
  // ---------------------------------------------------------------- HOOKS

  const [unpublishFlavor, { loading, error }] = useUnPublishFlavorMutation({
    refetchQueries: [
      {
        query: FlavorDocument,
        variables: {
          eggId
        }
      }
    ]
  });

  // ---------------------------------------------------------------- RENDER

  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <Button
        onClick={async () => {
          await unpublishFlavor({ variables: { id } });
        }}
        disabled={loading}
      >
        UnPublish{loading ? "ing" : ""}
      </Button>
    </>
  );
};
