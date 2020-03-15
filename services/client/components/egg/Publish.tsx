import { useMutation } from "@apollo/react-hooks";
import React from "react";
import {
  PUBLISH_EGG_MUTATION,
  UNPUBLISH_EGG_MUTATION
} from "../../graphql/Mutation";
import { PUBLIC_BASKET_QUERY, USER_BASKET_QUERY } from "../../graphql/Query";
import { Button } from "../styled";

// ##### COMPONENT PROPS TYPE #####
interface IPublishEggProps {
  id: string;
  isPublished: boolean;
}

// ##### COMPONENT #####
const PublishEgg: React.FunctionComponent<IPublishEggProps> = props => {
  // ##### HOOKS #####

  // Publish Egg Mutation hook
  const [
    publishEgg,
    { loading: publishing, error: publishError }
  ] = useMutation(PUBLISH_EGG_MUTATION, {
    variables: { id: props.id },
    refetchQueries: [
      {
        query: PUBLIC_BASKET_QUERY
      },
      {
        query: USER_BASKET_QUERY
      }
    ]
  });
  // Unpublish Egg Mutation hook
  const [
    unPublishEgg,
    { loading: unPublishing, error: unPublishError }
  ] = useMutation(UNPUBLISH_EGG_MUTATION, {
    variables: { id: props.id },
    refetchQueries: [
      {
        query: PUBLIC_BASKET_QUERY
      },
      {
        query: USER_BASKET_QUERY
      }
    ]
  });

  // ##### CONSTANT ENCLOSING #####

  const handleClick = () => {
    if (props.isPublished) {
      unPublishEgg();
    } else {
      publishEgg();
    }
  };

  // ##### RENDER #####

  // if any error in publishing Egg
  if (publishError) return <p>Error: {publishError.message}</p>;
  // if any error in publishing Egg
  if (unPublishError) return <p>Error: {unPublishError.message}</p>;

  return (
    <>
      <Button onClick={handleClick} disabled={publishing || unPublishing}>
        {props.isPublished ? "Unpublish" : "Publish"}
      </Button>
    </>
  );
};

export default PublishEgg;
