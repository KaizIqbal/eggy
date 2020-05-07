import React from "react";

import {
  FlavorsDocument,
  PublicBasketDocument,
  useDenyFlavorMutation
} from "generated/graphql";

import { Button } from "components/styled";

interface IProps {
  id: string;
  eggId: string;
}

export const DenyFlavor: React.FC<IProps> = ({ id, eggId }) => {
  // ---------------------------------------------------------------- HOOKS

  const [denyFalvor, { loading, error }] = useDenyFlavorMutation({
    refetchQueries: [
      {
        query: FlavorsDocument,
        variables: {
          eggId
        }
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
          await denyFalvor({ variables: { id } });
        }}
        disabled={loading}
      >
        UnPublish{loading ? "ing" : ""}
      </Button>
    </>
  );
};
