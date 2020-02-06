import React from "react";
import Flavours from "../flavour/Flavours";
import { useQuery } from "@apollo/react-hooks";
import { EGG_QUERY } from "../../graphql/Query";
import CreateFlavour from "../flavour/Create";

// ##### COMPONENT PROPS TYPE #####

interface ICursorWorkshopProps {
  username: any;
  eggname: any;
  flavourname: any;
}

// ##### COMPONENT #####

const CursorWorkshop: React.FunctionComponent<ICursorWorkshopProps> = props => {
  // ##### HOOKS #####

  // ##### RENDER #####

  return (
    <>
      <h1>
        {props.username}'s Workshop for {props.eggname} {props.flavourname}
      </h1>
    </>
  );
};

export default CursorWorkshop;
