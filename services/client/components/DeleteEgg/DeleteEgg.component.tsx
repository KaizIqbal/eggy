import { useMutation } from "@apollo/react-hooks";
import * as React from "react";
import { DELETE_EGG_MUTATION } from "../../graphql/Mutation";
import { Button } from "./DeleteEgg.styles";
import { EGGS_QUERY } from "../../graphql/Query";

// ##### COMPONENT PROPS TYPE #####
interface IDeleteEggProps {
  children: any;
  id: string;
}

// ##### COMPONENT #####
const DeleteEgg: React.FunctionComponent<IDeleteEggProps> = props => {
  // ##### CACHE UPDATE #####

  //Manually Update  the cache on the client,so ot matches the server
  const updateCache = async (cache, { data }) => {
    try {
      const eggList = cache.readQuery({ query: EGGS_QUERY });
      const newEggList = eggList.eggs.filter(
        egg => egg.id !== data.deleteEgg.id
      );
      await cache.writeQuery({
        query: EGGS_QUERY,
        data: { eggs: newEggList }
      });
    } catch (error) {
      console.error(error);
    }
  };

  // ##### HOOKS #####

  // DeleteEgg Mutation hook
  const [deleteEgg, { error }] = useMutation(DELETE_EGG_MUTATION, {
    variables: { id: props.id },
    update: updateCache
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

  return <Button onClick={onClick}>{props.children}</Button>;
};

export default DeleteEgg;
