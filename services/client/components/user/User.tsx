import Link from "../layout/Link";
import React from "react";
import useUser from "../../hooks/graphql/user";
import Signout from "../auth/Signout";
import paths from "../../paths";

// ##### COMPONENT PROPS TYPE #####

interface IUserProps {
  children: any;
}

// ##### COMPONENT #####

const User: React.FunctionComponent<IUserProps> = props => {
  // ##### HOOKS #####

  const { me, loading, error } = useUser();

  // ##### RENDER #####

  if (loading) return <p>Loading....</p>;
  if (!me) return props.children;
  if (error) return <p>Error! ${error.message}</p>;

  if (me) return <p>..</p>;
};

export default User;
