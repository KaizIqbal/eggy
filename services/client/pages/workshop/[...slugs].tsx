import React from "react";
import { NextPage } from "next";

import Page from "components/Page";

import { Redirect } from "lib/redirect";

interface IProps {
  slugs?: any;
}

const Workshop: NextPage<IProps> = ({ slugs }) => {
  if (!slugs) return <p>Oops</p>;

  return (
    <Page title="Eggy Workshop">
      <h1>Workshop</h1>
      {slugs.map((slug: any) => (
        <p key={slug}>{slug}</p>
      ))}
    </Page>
  );
};

Workshop.getInitialProps = async ctx => {
  const { query } = ctx;

  const { slugs } = query;
  if (!slugs || slugs.length > 4) {
    Redirect(ctx, "/basket");
  }

  return { slugs };
};

export default Workshop;
