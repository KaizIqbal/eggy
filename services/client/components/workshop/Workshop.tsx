import React from "react";
import CreateCursor from "../cursor/Create";
import { useQuery } from "@apollo/react-hooks";
import { EGG_QUERY } from "../../graphql/Query";

// ##### COMPONENT PROPS TYPE #####

interface IWorkshopProps {
  username: any;
  eggname: any;
}

// ##### COMPONENT #####

const WorkshopPage: React.FunctionComponent<IWorkshopProps> = props => {
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
      <CreateCursor eggId={data.egg.id} />
    </>
  );
};

export default WorkshopPage;
