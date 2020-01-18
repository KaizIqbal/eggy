import { useMutation } from "@apollo/react-hooks";
import React from "react";
import { LOGOUT_MUTATION } from "../../../graphql/Mutation";
import { ME_QUERY } from "../../../graphql/Query";
import { Button } from "./LogOut.styles";

// ##### COMPONENT PROPS TYPE #####
interface ILogOutProps {}

// ##### COMPONENT #####
const LogOut: React.FunctionComponent<ILogOutProps> = props => {
  // ##### HOOKS #####

  // logOut Mutation hook
  const [logOut, { error }] = useMutation(LOGOUT_MUTATION, {
    refetchQueries: [
      {
        query: ME_QUERY
      }
    ],
    onCompleted: ({ logout }) => {
      try {
        // console.log(logout);
      } catch (error) {
        console.error(error);
      }
    }
  });

  // ##### HANDLING FUNCTION #####

  //Handle onClick on Button
  const onClick = () => {
    if (window.confirm("Are you sure you want to Logout!")) {
      logOut();
    }
  };
  // ##### RENDER #####

  // if any error in form submiting
  if (error) return <p>Error: {error.message}</p>;

  // else render form
  return (
    <Button type="button" onClick={onClick}>
      Logout
    </Button>
  );
};

export default LogOut;
