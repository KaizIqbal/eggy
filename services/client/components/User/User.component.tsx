import React from "react";
import useUser from "./User.hooks";

// ##### COMPONENT PROPS TYPE #####

interface IUserProps {}

// ##### COMPONENT #####

const User: React.FunctionComponent<IUserProps> = props => {
  // ##### HOOKS #####

  const { me, loading, error } = useUser();

  // ##### RENDER #####

  if (loading) return <p>Fetching user...</p>;
  if (error) return <p>Error! ${error.message}</p>;

  if (me) return <p>{me.name}</p>;
  return <p>Guest</p>;
};

export default User;
