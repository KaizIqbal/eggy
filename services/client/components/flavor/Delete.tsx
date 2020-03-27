import React from "react";

import { useDeleteFlavorMutation, FlavorsDocument } from "generated/graphql";

import { Button } from "components/styled";

interface IProps {
  id: string;
  eggId: string;
}

export const DeleteFlavor: React.FC<IProps> = ({ id, eggId }) => {
  // ---------------------------------------------------------------- HOOKS

  const [deleteFlavor, { error }] = useDeleteFlavorMutation({
    variables: { id },
    refetchQueries: [
      {
        query: FlavorsDocument,
        variables: { eggId }
      }
    ]
  });

  // ---------------------------------------------------------------- RENDER

  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <Button onClick={() => deleteFlavor()}>Delete</Button>
    </>
  );
};
