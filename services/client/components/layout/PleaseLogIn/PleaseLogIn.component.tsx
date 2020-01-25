import useUser from "../../../hooks/user";
import React from "react";

// ##### COMPONENT PROPS TYPE #####
interface IPleaseLogInProps {
  children: any;
}

// ##### COMPONENT #####
const PleaseLogIn: React.FunctionComponent<IPleaseLogInProps> = props => {
  // ##### HOOKS #####

  const { me, loading, error } = useUser();

  // ##### RENDER #####

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! ${error.message}</p>;

  if (!me) {
    return <p>Please Login to Continue</p>;
  }

  return props.children;
};
export default PleaseLogIn;
