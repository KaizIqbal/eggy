import React from "react";

// ##### COMPONENT PROPS TYPE #####

interface IWorkshopProps {
  username: any;
  eggname: any;
}

// ##### COMPONENT #####

const Workshop: React.FunctionComponent<IWorkshopProps> = props => {
  // ##### HOOKS #####

  // ##### RENDER #####

  return (
    <h1>
      {props.username}'s Workshop for {props.eggname}
    </h1>
  );
};

export default Workshop;
