import React from "react";

import { useEggQuery } from "generated/graphql";
import Head from "next/head";

interface IProps {
  eggname: any;
}

export const EggPage: React.FC<IProps> = ({ eggname }) => {
  // ---------------------------------------------------------------- HOOKS

  const { data, loading, error } = useEggQuery({ variables: { eggname } });

  // ---------------------------------------------------------------- RENDER

  if (loading)
    return (
      <>
        <Head>
          <title>Loading.. - Eggy</title>
        </Head>
        <p>Loading Egg Page.....</p>
      </>
    );

  if (error) return <p>Error: {error.message}</p>;

  if (data && data.egg)
    return (
      <>
        <Head>
          <title>{data.egg.title} - Eggy</title>
        </Head>
        {/* Details */}
        <h1>{data.egg.title} Page</h1>
        <p>by {data.egg.user.firstName + " " + data.egg.user.lastName}</p>
        Available for:
        {data.egg.platforms.map(platform => (
          <p key={platform}>{platform}</p>
        ))}
      </>
    );

  return (
    <>
      <h1>Opps... </h1>
      <p>No Egg Found</p>
    </>
  );
};
