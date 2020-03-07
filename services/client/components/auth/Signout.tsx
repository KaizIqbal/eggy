import React from "react";
import Router from "next/router";

// Graphql Query & Mutation
import { SIGNOUT_MUTATION } from "../../graphql/Mutation";
import { ME_QUERY } from "../../graphql/Query";

// Hooks libraries
import { useMutation } from "@apollo/react-hooks";

// styled components
import { Button } from "../styled";

// Contains all routes
import paths from "../../paths";

// ################################################ COMPONENT'S TYPE ####################################

interface IProps {}

// ################################################ COMPONENT ###############################################
const Signout: React.FunctionComponent<IProps> = _props => {
  // ################################################ HOOKS ################################################

  // signout Mutation hook
  const [signout, { error }] = useMutation(SIGNOUT_MUTATION, {
    refetchQueries: [
      {
        query: ME_QUERY
      }
    ],
    onCompleted: () => {
      Router.replace(paths.home);
    }
  });

  // ################################################ HANDLING FUNCTION ################################################

  // ################ Form submition #################
  // #                                               #
  // #     1. confirm message                        #
  // #     2. call mutation                          #
  // #     3. handle error                           #
  // #                                               #
  // #################################################

  const onClick = () => {
    if (window.confirm("Are you sure you want to Signout!")) {
      signout();
    }
  };

  // ################################################ RENDER #####################################################

  // ################## Render flow ##################
  // #                                               #
  // #     (error) => handle the Graphql error       #
  // #     else => Render Component                  #
  // #                                               #
  // #################################################

  if (error) return <p>Error: {error.message}</p>;

  return (
    <Button type="button" onClick={onClick}>
      Signout
    </Button>
  );
};

export default Signout;
