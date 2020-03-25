import React from "react";
import { NextPage } from "next";

import { endpoint } from "lib/endpoint";
import { Redirect } from "lib/redirect";

import Page from "components/Page";

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

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `{
        isUserAvailable(username: "${username}"){
          available
        }
      }`
    })
  }).then(response => response.json());

  const {
    data: {
      isUserAvailable: { available }
    }
  } = response;

  if (!available) {
    Redirect(context, `/search/${username}`);
  }

  return { username };
};
export default UserProfilePage;
