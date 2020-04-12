import React from "react";

import { useUnPublishEggMutation, PublicBasketDocument, UserBasketDocument } from "generated/graphql";

import { Button } from "components/styled";

interface IProps {
  id: string;
}

export const UnPublishEgg: React.FC<IProps> = ({ id }) => {
  // ---------------------------------------------------------------- HOOKS

  const [unPublishEgg, { loading, error }] = useUnPublishEggMutation({
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
      <Button
        onClick={async () => {
          await unPublishEgg({ variables: { id } });
        }}
        disabled={loading}>
        UnPublish{loading ? "ing" : ""}
      </Button>
    </>
  );
};
