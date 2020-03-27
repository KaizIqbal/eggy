import React from "react";
import { NextPage } from "next";
import fetch from "isomorphic-unfetch";

import { Redirect } from "lib/redirect";
import { endpoint } from "lib/endpoint";
import { getAccessToken } from "lib/accessToken";

import Page from "components/Page";
import { MainWorkshop, FlavorWorkshop } from "components/workshops";

interface IProps {
  eggname?: any;
  flavorId?: any;
}

const Workshop: NextPage<IProps> = ({ eggname, flavorId }) => {
  let body: any;

  if (flavorId && eggname) {
    body = <FlavorWorkshop id={flavorId} />;
  } else if (eggname) {
    body = <MainWorkshop eggname={eggname} />;
  } else {
    body = (
      <>
        <h1>Oops</h1>
        <p>Workshop Not Fetched</p>
      </>
    );
  }

  return <Page title="Eggy Workshop">{body}</Page>;
};

Workshop.getInitialProps = async context => {
  const { query } = context;

  const { slugs } = query;

  // valid url => /workshop/eggname/flavorid/cursorid = 3 slug
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

  const flavorId = slugs[1];

  return { eggname, flavorId };
};

export default Workshop;
