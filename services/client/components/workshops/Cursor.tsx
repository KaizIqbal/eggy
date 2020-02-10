import { useQuery } from "@apollo/react-hooks";
import React from "react";
import { CURSOR_QUERY } from "../../graphql/Query";

// ##### COMPONENT PROPS TYPE #####

interface ICursorWorkshopProps {
  eggname: any;
  flavorname: any;
  cursorname: any;
}

// ##### COMPONENT #####

const CursorWorkshop: React.FunctionComponent<ICursorWorkshopProps> = props => {
  // ##### HOOKS #####

  const { data, loading, error } = useQuery(CURSOR_QUERY, {
    variables: {
      eggname: props.eggname,
      flavorname: props.flavorname,
      cursorname: props.cursorname
    }
  });

  // ##### RENDER #####
  if (loading) return <p>Fetching cursor......</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!data) return <p>Cursor not found</p>;

  return (
    <>
      <h1>{data.cursor.name}</h1>
      <p>{data.cursor.frames}</p>
    </>
  );
};

export default CursorWorkshop;
