import React from "react";
import Head from "next/head";
import { Egg } from "generated/graphql";

interface IProps {
  egg: any;
}

export const ShowEgg: React.FC<IProps> = props => {
  const egg: Egg = props.egg;
  // ---------------------------------------------------------------- RENDER
  return (
    <>
      <Head>
        <title>{egg.title} - Eggy Basket</title>
      </Head>
      {/* Details */}
      <div>
        <h1>{egg.title}</h1>
      </div>
      <p>by {egg.user.firstName + " " + egg.user.lastName}</p>
      Available for:
      {egg.platforms.map(platform => (
        <p key={platform}>{platform}</p>
      ))}
    </>
  );
};
