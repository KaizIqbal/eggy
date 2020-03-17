import React from "react";

import { useSignOutMutation } from "generated/graphql";

import { Button } from "components/styled";
import { setAccessToken } from "lib/accessToken";

interface IProps {}

export const Signout: React.FunctionComponent<IProps> = _props => {
  // ##### HOOKS #####

  const [signout, { error }] = useSignOutMutation({
    onCompleted: () => {
      setAccessToken("");
    }
  });

  // ##### HANDLING FUNCTION #####

  const onClick = () => {
    if (window.confirm("Are you sure you want to Signout!")) {
      signout();
    }
  };

  // ##### RENDER #####

  if (error) return <p>Error: {error.message}</p>;

  return (
    <Button type="button" onClick={onClick}>
      Signout
    </Button>
  );
};
