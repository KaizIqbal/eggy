import { useMutation } from "@apollo/react-hooks";
import * as React from "react";
import { DELETE_EGG_MUTATION } from "../../graphql/Mutation";
import { EGGS_QUERY } from "../../graphql/Query";
import { Button } from "./DeleteEgg.styles";

// DeleteEgg Component
interface IDeleteEggProps {
  children: any;
  id: any;
}

const DeleteEgg: React.FunctionComponent<IDeleteEggProps> = props => {
  //Manually Update  the cache on the client,so ot matches the server
  const update = (Cache, payload) => {
    // 1. Read the cache for the eggs we want
    const data = Cache.readQuery({ query: EGGS_QUERY });
    // console.log(data, payload);
    // 2. filter the deleted egg to the list
    data.eggs = data.eggs.filter(egg => egg.id !== payload.data.deleteEgg.id);
    // 3.put the eggs back
    Cache.writeQuery({ query: EGGS_QUERY, data });
  };

  // DeleteEgg Mutation hook
  const [deleteEgg, { error }] = useMutation(DELETE_EGG_MUTATION, {
    variables: { id: props.id },
    update: update
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
