import { useMutation } from "@apollo/react-hooks";
import * as React from "react";
import { DELETE_EGG_MUTATION } from "../../graphql/Mutation";
import { Button } from "./DeleteEgg.styles";
import { EGGS_QUERY } from "../../graphql/Query";

// DeleteEgg Component
interface IDeleteEggProps {
  children: any;
  id: any;
}

const DeleteEgg: React.FunctionComponent<IDeleteEggProps> = props => {
  //Manually Update  the cache on the client,so ot matches the server
  const updateCache = async (cache, { data }) => {
    try {
      const eggList = cache.readQuery({ query: EGGS_QUERY });
      // console.log(eggList);
      const newEggList = eggList.eggs.filter(
        egg => egg.id !== data.deleteEgg.id
      );
      // console.log(newEggList);
      await cache.writeQuery({
        query: EGGS_QUERY,
        data: { eggs: newEggList }
      });
    } catch (error) {
      console.error(error);
    }
  };

  // DeleteEgg Mutation hook
  const [deleteEgg, { error }] = useMutation(DELETE_EGG_MUTATION, {
    variables: { id: props.id },
    update: updateCache
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
