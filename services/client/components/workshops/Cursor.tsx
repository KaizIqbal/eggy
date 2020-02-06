import React from "react";

// ##### COMPONENT PROPS TYPE #####

interface ICursorWorkshopProps {
  username: any;
  eggname: any;
  flavorname: any;
}

// ##### COMPONENT #####

const CursorWorkshop: React.FunctionComponent<ICursorWorkshopProps> = props => {
  // ##### HOOKS #####

  // ##### RENDER #####

  return (
    <>
      <h1>
        {props.username}'s Workshop for {props.eggname} {props.flavorname}
      </h1>
    </>
  );
};

export default CursorWorkshop;
