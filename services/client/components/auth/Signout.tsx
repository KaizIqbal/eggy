import React from "react";
import Router from "next/router";

import { useSignOutMutation } from "generated/graphql";

import { Button } from "components/styled";
import { setAccessToken } from "lib/accessToken";

interface IProps {}

export const Signout: React.FC<IProps> = _props => {
  // ---------------------------------------------------------------- HOOKS

  const [signout, { error, client }] = useSignOutMutation();

  // ---------------------------------------------------------------- RENDER

  if (error) return <p>Error: {error.message}</p>;

  return (
    <Button
      type="button"
      onClick={async () => {
        await signout();
        setAccessToken("");
        await client!.resetStore();
        Router.replace("/");
      }}>
      Signout
    </Button>
  );
};
