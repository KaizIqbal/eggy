import { useMutation } from "@apollo/react-hooks";
import React from "react";
import { DELETE_EGG_MUTATION } from "../../graphql/Mutation";
import { PUBLIC_BASKET_QUERY, USER_BASKET_QUERY } from "../../graphql/Query";
import { Button } from "../styled";

// ##### COMPONENT PROPS TYPE #####
interface IDeleteEggProps {
  eggname: string;
}

// ##### COMPONENT #####
const DeleteEgg: React.FunctionComponent<IDeleteEggProps> = props => {
  // ##### HOOKS #####

  // DeleteEgg Mutation hook
  const [deleteEgg, { error }] = useMutation(DELETE_EGG_MUTATION, {
    variables: { eggname: props.eggname },
    refetchQueries: [
      {
        query: PUBLIC_BASKET_QUERY
      },
      {
        query: USER_BASKET_QUERY
      }
    ]
  });

  // ##### HANDLING FUNCTION #####

  //Handle onClick on Button
  const onClick = () => {
    if (window.confirm("Are you sure you want to delete this egg?")) {
      deleteEgg();
    }
  };

  // ##### RENDER #####

  // if any error in fetching Data
  if (error) return <p>Error: {error.message}</p>;

  return <Button onClick={onClick}>Delete</Button>;
};

export default DeleteEgg;
