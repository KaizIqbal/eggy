import React from "react";

import { useDeleteEggMutation, PublicBasketDocument, UserBasketDocument } from "generated/graphql";

import { Button } from "components/styled";

interface IProps {
  id: string;
}

export const DeleteEgg: React.FC<IProps> = ({ id }) => {
  // ---------------------------------------------------------------- HOOKS

  const [deleteEgg, { error }] = useDeleteEggMutation({
    variables: { id },
    refetchQueries: [
      {
        query: PublicBasketDocument
      },
      {
        query: UserBasketDocument
      }
    ]
  });

  // ---------------------------------------------------------------- RENDER

  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <Button onClick={() => deleteEgg()}>Delete</Button>
    </>
  );
};
