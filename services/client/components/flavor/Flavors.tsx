// import Link from "next/link";
// import Router from "next/router";
import React from "react";
import useFlavors from "../../hooks/graphql/flavors";
// import { Button } from "../styled";
import DeleteFlavor from "./Delete";

// ##### COMPONENT PROPS TYPE #####
interface IFlavorsProps {
  username: string;
  eggname: string;
}

// ##### COMPONENT #####
const Flavors: React.FunctionComponent<IFlavorsProps> = props => {
  // ##### HOOKS #####

  //fetching all Flavours in Egg
  const { data, loading } = useFlavors({ eggname: props.eggname });

  if (loading) return <p>Loading Flavors..........</p>;
  // ##### RENDER #####
  return (
    <div>
      {data.map((flavor: any) => (
        <li key={flavor.id}>
          {flavor.name}

          <DeleteFlavor id={flavor.id} eggname={props.eggname} />
        </li>
      ))}
    </div>
  );
};

export default Flavors;
