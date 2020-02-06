import React from "react";
import Flavors from "../flavor/Flavors";
import { useQuery } from "@apollo/react-hooks";
import { EGG_QUERY } from "../../graphql/Query";
import CreateFlavor from "../flavor/Create";

// ##### COMPONENT PROPS TYPE #####

interface IFlavorWorkshopProps {
  username: any;
  eggname: any;
}

// ##### COMPONENT #####

const FlavourWorkshop: React.FunctionComponent<
  IFlavorWorkshopProps
> = props => {
  // ##### HOOKS #####
  const { data, loading, error } = useQuery(EGG_QUERY, {
    variables: {
      eggname: props.eggname
    }
  });

  // ##### RENDER #####
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <>
      <h1>
        {props.username}'s Workshop for {props.eggname}
      </h1>
      <CreateFlavor eggname={data.egg.eggname} eggId={data.egg.id} />
      <Flavors username={props.username} eggname={data.egg.eggname} />
    </>
  );
};

export default FlavourWorkshop;
