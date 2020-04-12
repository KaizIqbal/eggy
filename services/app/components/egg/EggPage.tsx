import React from "react";

import { useEggQuery } from "generated/graphql";
import Head from "next/head";
import { ShowEgg } from ".";

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

  if (data && data.egg) return <ShowEgg egg={data.egg} />;

  return (
    <>
      <h1>Opps... </h1>
      <p>No Egg Found</p>
    </>
  );
};
