import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { FLAVOR_QUERY } from "../../graphql/Query";
import CreateCursor from "../cursor/Create";
import Cursors from "../cursor/Cursors";

// ##### COMPONENT PROPS TYPE #####

interface ICursorWorkshopProps {
  username: any;
  eggname: any;
  flavorname: any;
}

// ##### COMPONENT #####

const CursorWorkshop: React.FunctionComponent<ICursorWorkshopProps> = props => {
  // ##### HOOKS #####

  const { data, loading, error } = useQuery(FLAVOR_QUERY, {
    variables: {
      name: props.flavorname
    }
  });

  // ##### RENDER #####
  if (loading) return <p>Fetching Falvor......</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!data) return <p>Flavor not found</p>;

  return (
    <>
      <h1>
        {props.username}'s Workshop for {props.eggname} {data.flavor.name}
      </h1>
      <CreateCursor flavorname={data.flavor.name} flavorId={data.flavor.id} />
      <Cursors flavorname={data.flavor.name} />
    </>
  );
};

export default CursorWorkshop;
