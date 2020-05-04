import React from "react";

import {
  usePublishFlavorMutation,
  PublicBasketDocument,
  UserBasketDocument
} from "generated/graphql";

import { Button } from "components/styled";

interface IProps {
  id: string;
}

export const PublishFlavor: React.FC<IProps> = ({ id }) => {
  // ---------------------------------------------------------------- HOOKS

  const [publishFlavor, { loading, error }] = usePublishFlavorMutation({
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
          await publishFlavor({ variables: { id } });
        }}
        disabled={loading}
      >
        Publish{loading ? "ing" : ""}
      </Button>
    </>
  );
};
