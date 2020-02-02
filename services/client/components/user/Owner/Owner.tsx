import React from "react";
import useUser from "../../../hooks/user";

// ##### COMPONENT PROPS TYPE #####

interface IOwnerProps {
  children: any;
  username: any;
}

// ##### COMPONENT #####

const Owner: React.FunctionComponent<IOwnerProps> = props => {
  // ##### HOOKS #####

  const { me, error } = useUser();

  // ##### RENDER #####

  if (error) return <p>Error! ${error.message}</p>;

  // user is Owner so have permission to perform egg operation
  if (me.username === props.username) {
    return props.children;
  }

  // user not hve permission so render public page
  return <p>{props.username} public page</p>;
};

export default Owner;
