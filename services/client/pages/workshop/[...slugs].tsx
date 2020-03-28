import React from "react";
import { NextPage } from "next";

import { Redirect } from "lib/redirect";
import { isEggAccessible } from "helper/isEggAccessible";

import Page from "components/Page";
import { MainWorkshop, FlavorWorkshop, CursorWorkshop } from "components/workshops";

interface IProps {
  eggname?: any;
  flavorId?: any;
  cursorId?: any;
}

const Workshop: NextPage<IProps> = ({ eggname, flavorId, cursorId }) => {
  let body: any;

  if (cursorId && flavorId && eggname) {
    body = <CursorWorkshop id={cursorId} />;
  } else if (flavorId && eggname) {
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
  // More then 3 slug => Redirect to Basket
  if (!slugs || slugs.length > 3) {
    Redirect(context, "/basket");
  }
  const eggname = slugs[0];

  // Graphql Query for checking Egg access
  const access = await isEggAccessible(eggname);

  if (!access) {
    Redirect(context, "/basket");
  }

  const flavorId = slugs[1];
  const cursorId = slugs[2];

  return { eggname, flavorId, cursorId };
};

export default Workshop;
