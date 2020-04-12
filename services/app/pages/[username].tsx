import React from "react";
import { NextPage } from "next";

import { Redirect } from "lib/redirect";

import Page from "components/Page";
import { isUserAvailable } from "helper/isUserAvailable";

interface IProps {
  username?: any;
}

const UserProfilePage: NextPage<IProps> = ({ username }) => {
  return (
    <Page title={`${username} - Eggy`}>
      <h1>👋 {username}</h1>
    </Page>
  );
};

UserProfilePage.getInitialProps = async context => {
  const { query } = context;

  const { username } = query;

  // Helper using Graphql Query
  const available = await isUserAvailable(username);

  if (!available) {
    Redirect(context, `/search/${username}`);
  }

  return { username };
};
export default UserProfilePage;
