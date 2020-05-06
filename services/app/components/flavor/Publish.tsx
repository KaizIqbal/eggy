import React from "react";

import {
  usePublishFlavorMutation,
  FlavorsDocument,
  PublicBasketDocument
} from "generated/graphql";

import { Button } from "components/styled";

interface IProps {
  id: string;
  eggId: string;
}

export const PublishFlavor: React.FC<IProps> = ({ id, eggId }) => {
  // ---------------------------------------------------------------- HOOKS

  const [publishFlavor, { loading, error }] = usePublishFlavorMutation({
    refetchQueries: [
      {
        query: FlavorsDocument,
        variables: { eggId }
      },
      {
        query: PublicBasketDocument
      }
    ]
  });

  // ---------------------------------------------------------------- RENDER

  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <Button
        onClick={async () => {
          await publishFlavor({ variables: { id } });
        }}
        disabled={loading}
      >
        Publish{loading ? "ing" : ""}
      </Button>
    </>
  );
};
