import { useMutation } from "@apollo/react-hooks";
import Router from "next/router";
import React from "react";
import { SIGNOUT_MUTATION } from "../../graphql/Mutation";
import { ME_QUERY } from "../../graphql/Query";
import { Button } from "../styled";

// ##### COMPONENT PROPS TYPE #####
interface ISignOutProps {}

// ##### COMPONENT #####
const SignOut: React.FunctionComponent<ISignOutProps> = props => {
  // ##### HOOKS #####

  // logOut Mutation hook
  const [signOut, { error }] = useMutation(SIGNOUT_MUTATION, {
    refetchQueries: [
      {
        query: ME_QUERY
      }
    ],
    onCompleted: ({ signOut }) => {
      Router.push({
        pathname: "/"
      });
    }
  });

  // ##### HANDLING FUNCTION #####

  //Handle onClick on Button
  const onClick = () => {
    if (window.confirm("Are you sure you want to Signout!")) {
      signOut();
    }
  };
  // ##### RENDER #####

  // if any error in form submiting
  if (error) return <p>Error: {error.message}</p>;

  // else render form
  return (
    <Button type="button" onClick={onClick}>
      Signout
    </Button>
  );
};

export default SignOut;
