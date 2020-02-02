import Link from "next/link";
import React from "react";
import useUser from "../../../hooks/user";

// ##### COMPONENT PROPS TYPE #####

interface IUserProps {
  children: any;
  username: any;
}

// ##### COMPONENT #####

const User: React.FunctionComponent<IUserProps> = props => {
  // ##### HOOKS #####

  const { me, error } = useUser();

  // ##### RENDER #####

  if (error) return <p>Error! ${error.message}</p>;

  // user is Owner so have permission to edit update
  if (me.username === props.username) {
    return props.children;
  }

  // else user public page
  return <p>{props.username} Public page</p>;
};

export default User;
