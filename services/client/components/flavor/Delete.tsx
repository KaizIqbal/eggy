import { useMutation } from "@apollo/react-hooks";
import React from "react";
import { DELETE_FLAVOR_MUTATION } from "../../graphql/Mutation";
import { FLAVORS_QUERY } from "../../graphql/Query";
import { Button } from "../styled";

// ##### COMPONENT PROPS TYPE #####
interface IDeleteFlavorProps {
  eggname: string;
  id: string;
}

// ##### COMPONENT #####
const DeleteFlavor: React.FunctionComponent<IDeleteFlavorProps> = props => {
  // ##### HOOKS #####

  // Mutation hooks for  deleting flavor
  const [deleteFlavor, { error }] = useMutation(DELETE_FLAVOR_MUTATION, {
    variables: { id: props.id },
    refetchQueries: [
      {
        query: FLAVORS_QUERY,
        variables: {
          eggname: props.eggname
        }
      }
    ]
  });

  // ##### HANDLING FUNCTION #####

  //Handle onClick on Button
  const onClick = () => {
    if (window.confirm("Are you sure you want to delete this flavor?")) {
      deleteFlavor();
    }
  };

  // ##### RENDER #####

  // if any error in fetching Data
  if (error) return <p>Error: {error.message}</p>;

  return <Button onClick={onClick}>Delete</Button>;
};

export default DeleteFlavor;
