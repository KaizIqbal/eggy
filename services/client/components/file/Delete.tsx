import { useMutation } from "@apollo/react-hooks";
import React from "react";
import { DELETE_FILE_MUTATION } from "../../graphql/Mutation";
import { CURSOR_QUERY } from "../../graphql/Query";
import { Button } from "../styled";

// ##### COMPONENT PROPS TYPE #####
interface IDeleteFileProps {
  names: {
    eggname: string;
    flavorname: string;
    cursorname: string;
  };
  id: string;
}

// ##### COMPONENT #####
const DeleteFile: React.FunctionComponent<IDeleteFileProps> = props => {
  // ##### HOOKS #####

  // Delete File Mutation hook
  const [deleteFile, { error }] = useMutation(DELETE_FILE_MUTATION, {
    variables: {
      fileId: props.id
    },
    refetchQueries: [
      {
        query: CURSOR_QUERY,
        variables: {
          ...props.names
        }
      }
    ]
  });

  // ##### HANDLING FUNCTION #####

  //Handle onClick on Button
  const onClick = () => {
    if (window.confirm("Are you sure you want to delete it?")) {
      deleteFile();
    }
  };

  // ##### RENDER #####

  // if any error in fetching Data
  if (error) return <p>Error: {error.message}</p>;

  return <Button onClick={onClick}>Delete</Button>;
};

export default DeleteFile;
