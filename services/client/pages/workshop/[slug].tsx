import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

import { Redirect } from "lib/redirect";
import { isEggAccessible } from "helper/isEggAccessible";

import Page from "components/Page";
import { MainWorkshop, FlavorWorkshop, CursorWorkshop } from "components/workshops";

interface IProps {
  eggname?: any;
}

const Workshop: NextPage<IProps> = ({ eggname }) => {
  // ---------------------------------------------------------------- HOOKS

  const {
    query: { flavorId, cursorId }
  } = useRouter();

  // ---------------------------------------------------------------- RENDER

  let body: any;

  if (cursorId && flavorId && eggname) {
    body = <CursorWorkshop id={cursorId} />;
  } else if (flavorId && eggname) {
    body = <FlavorWorkshop id={flavorId} />;
  } else {
    body = <MainWorkshop eggname={eggname} />;
  }

  return <Page title="Eggy Workshop">{body}</Page>;
};

Workshop.getInitialProps = async context => {
  const { query } = context;

  const { slug } = query;

  if (!slug) {
    Redirect(context, "/basket");
  }
  // Graphql Query for checking Egg access
  const access = await isEggAccessible(slug);

  if (!access) {
    Redirect(context, "/basket");
  }

  return { eggname: slug };
};

export default Workshop;
