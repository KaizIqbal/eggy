import React from "react";
import useUser from "../../hooks/user";
import Router from "next/router";

// ##### COMPONENT PROPS TYPE #####

interface IEggOwnerProps {
  children: any;
  username: any;
  eggname: any;
}

// ##### COMPONENT #####

const EggOwner: React.FunctionComponent<IEggOwnerProps> = props => {
  // ##### HOOKS #####

  const { me, loading, error } = useUser();

  // ##### RENDER #####

  if (error) return <p>Error! ${error.message}</p>;

  if (loading) return <p>Loading...</p>;

  // user not hve permission so render public page
  if (!me || me.username !== props.username) {
    return Router.push("/[user]/[egg]", `/${props.username}/${props.eggname}`);
  }

  // user is Owner so have permission to perform egg operation
  return props.children;
};

export default EggOwner;
