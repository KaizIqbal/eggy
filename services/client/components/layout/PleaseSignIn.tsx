import useUser from "../../hooks/user";
import React from "react";

// ##### COMPONENT PROPS TYPE #####
interface IPleaseSignInProps {
  children: any;
}

// ##### COMPONENT #####
const PleaseSignIn: React.FunctionComponent<IPleaseSignInProps> = props => {
  // ##### HOOKS #####

  const { me, loading, error } = useUser();

  // ##### RENDER #####

  if (loading) return <p>Loading...</p>;
  if (error) return <p>${error.message}</p>;

  if (!me) {
    return <p>Please Signin to Continue</p>;
  }

  return props.children;
};
export default PleaseSignIn;
