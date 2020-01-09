import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import * as React from "react";
import { Button } from "./DeleteEgg.styles";

// Mutation for DeleteEgg
const CREATE_EGG_MUTATION = gql`
  mutation DeleteEgg($title: String!) {
    DeleteEgg(title: $title) {
      id
    }
  }
`;

// DeleteEgg Component

interface IDeleteEggProps {
  children: any;
}

const DeleteEgg: React.FunctionComponent<IDeleteEggProps> = props => {
  // DeleteEgg Mutation hook
  const [DeleteEgg, { loading, error }] = useMutation(CREATE_EGG_MUTATION);
  return <Button>{props.children}</Button>;
};

export default DeleteEgg;
