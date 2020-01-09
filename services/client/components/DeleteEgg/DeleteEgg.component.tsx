import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import * as React from "react";
import { Button } from "./DeleteEgg.styles";

// Mutation for DeleteEgg
const DELETE_EGG_MUTATION = gql`
  mutation deleteEgg($id: ID!) {
    deleteEgg(id: $id) {
      id
    }
  }
`;

// DeleteEgg Component

interface IDeleteEggProps {
  children: any;
  id: any;
}

const DeleteEgg: React.FunctionComponent<IDeleteEggProps> = props => {
  // DeleteEgg Mutation hook
  const [deleteEgg, { error }] = useMutation(DELETE_EGG_MUTATION, {
    variables: { id: props.id }
  });
  //Handle onClick
  const onClick = () => {
    if (window.confirm("Are you sure you want to delete this egg?")) {
      deleteEgg();
    }
  };
  if (error) return <p>Error: {error.message}</p>;
  return <Button onClick={onClick}>{props.children}</Button>;
};

export default DeleteEgg;
