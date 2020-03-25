import React from "react";
import { NextPage } from "next";
import fetch from "isomorphic-unfetch";

import { Redirect } from "lib/redirect";
import { endpoint } from "lib/endpoint";
import { getAccessToken } from "lib/accessToken";

import Page from "components/Page";

interface IProps {
  eggname?: any;
}

const Workshop: NextPage<IProps> = ({ eggname }) => {
  return (
    <Page title="Eggy Workshop">
      <h1>Workshop</h1>
      {eggname}
    </Page>
  );
};

Workshop.getInitialProps = async context => {
  const { query } = context;

  const { slugs } = query;

  // valid url => /workshop/eggname/flavorname/cursorname = 3 slug
  if (!slugs || slugs.length >= 3) {
    Redirect(context, "/basket");
  }
  const eggname = slugs[0];

  // Graphql Query for checking access
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", authorization: `Bearer ${getAccessToken()}` },
    body: JSON.stringify({
      query: `{
        isEggAccessible(eggname: "${eggname}") {
          access
        }
      }`
    })
  }).then(response => response.json());

  const {
    data: {
      isEggAccessible: { access }
    }
  } = response;

  if (!access) {
    Redirect(context, "/basket");
  }

  return { eggname };
};

export default Workshop;
