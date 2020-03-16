import React from "react";
import useUser from "../../hooks/graphql/user";

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
