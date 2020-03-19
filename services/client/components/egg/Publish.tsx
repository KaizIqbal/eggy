import React from "react";
import { usePublishMutation, PublicBasketDocument, UserBasketDocument } from "generated/graphql";
import { Button } from "components/styled";

interface IProps {
  id: string;
}

export const PublishEgg: React.FC<IProps> = ({ id }) => {
  // ---------------------------------------------------------------- HOOKS

  const [publishEgg, { loading, error }] = usePublishMutation({
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
          await publishEgg({ variables: { id } });
        }}
        disabled={loading}>
        Publish{loading ? "ing" : ""}
      </Button>
    </>
  );
};
