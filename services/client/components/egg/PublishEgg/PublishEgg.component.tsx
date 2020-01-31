import { useMutation } from "@apollo/react-hooks";
import React from "react";
import { PUBLISH_EGG_MUTATION } from "../../../graphql/Mutation";
import { GET_EGGS_CURSOR, GET_USER_EGGS_CURSOR } from "../../../graphql/Query";
import { Button } from "./PublishEgg.styles";

// ##### COMPONENT PROPS TYPE #####
interface IPublishEggProps {
  id: string;
  isPublished: boolean;
}

// ##### COMPONENT #####
const PublishEgg: React.FunctionComponent<IPublishEggProps> = props => {
  // ##### HOOKS #####

  // DeleteEgg Mutation hook
  const [publishEgg, { loading, error }] = useMutation(PUBLISH_EGG_MUTATION, {
    variables: { id: props.id },
    refetchQueries: [
      {
        query: GET_USER_EGGS_CURSOR
      }
    ]
  });

  // ##### HANDLING FUNCTION #####

  //Handle onClick on Button
  const onClick = () => {
    publishEgg();
  };

  // ##### RENDER #####

  // if any error in fetching Data
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Button disabled={props.isPublished} onClick={onClick}>
      Publish{loading ? "ing" : ""}
    </Button>
  );
};

export default PublishEgg;
