import { useMutation } from "@apollo/react-hooks";
import React from "react";
import { DELETE_CURSOR_MUTATION } from "../../graphql/Mutation";
import { CURSORS_QUERY } from "../../graphql/Query";
import { Button } from "../styled";

// ##### COMPONENT PROPS TYPE #####
interface IDeleteCursorProps {
  flavorname: string;
  id: string;
}

// ##### COMPONENT #####
const DeleteCursor: React.FunctionComponent<IDeleteCursorProps> = props => {
  // ##### HOOKS #####

  // Mutation hooks for deleting cursor
  const [deleteCursor, { error }] = useMutation(DELETE_CURSOR_MUTATION, {
    variables: { id: props.id },
    refetchQueries: [
      {
        query: CURSORS_QUERY,
        variables: {
          flavorname: props.flavorname
        }
      }
    ]
  });

  // ##### HANDLING FUNCTION #####

  //Handle onClick on Button
  const onClick = () => {
    if (window.confirm("Are you sure you want to delete this cursor?")) {
      deleteCursor();
    }
  };

  // ##### RENDER #####

  // if any error in fetching Data
  if (error) return <p>Error: {error.message}</p>;

  return <Button onClick={onClick}>Delete</Button>;
};

export default DeleteCursor;
