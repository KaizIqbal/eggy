import React from "react";
import useCursors from "../../hooks/graphql/cursors";
import DeleteCursor from "./Delete";

// ##### COMPONENT PROPS TYPE #####
interface IFlavorsProps {
  username: string;
  eggname: string;
  flavorname: string;
}

// ##### COMPONENT #####
const Cursors: React.FunctionComponent<IFlavorsProps> = props => {
  // ##### HOOKS #####

  //fetching all Cursors in Flavor
  const { data, loading } = useCursors({ flavorname: props.flavorname });

  if (loading) return <p>Loading Cursors..........</p>;
  // ##### RENDER #####
  return (
    <div>
      {data.map((cursor: any) => (
        <li key={cursor.id}>
          {cursor.name}

          <DeleteCursor id={cursor.id} flavorname={props.flavorname} />
        </li>
      ))}
    </div>
  );
};

export default Cursors;
