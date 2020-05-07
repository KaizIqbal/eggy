import React from "react";

import {
  FlavorsDocument,
  PublicBasketDocument,
  useConfirmFlavorMutation
} from "generated/graphql";

import { Button } from "components/styled";

interface IProps {
  id: string;
  eggId: string;
}

export const ConfirmFlavor: React.FC<IProps> = ({ id, eggId }) => {
  // ---------------------------------------------------------------- HOOKS

  const [confirmFlavor, { loading, error }] = useConfirmFlavorMutation({
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
          await confirmFlavor({ variables: { id } });
        }}
        disabled={loading}
      >
        Confirm
      </Button>
    </>
  );
};
