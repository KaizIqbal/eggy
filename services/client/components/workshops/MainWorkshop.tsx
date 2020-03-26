import React from "react";
import Head from "next/head";
import { useEggQuery } from "generated/graphql";

interface IProps {
  eggname: any;
}

export const MainWorkshop: React.FC<IProps> = ({ eggname }) => {
  // ---------------------------------------------------------------- HOOKS
  const { data, loading, error } = useEggQuery({ variables: { eggname } });

  // ---------------------------------------------------------------- RENDER

  if (loading)
    return (
      <>
        <Head>
          <title>Loading... - Eggy Workshop</title>
        </Head>
        <p>Loading Workshop.....</p>
      </>
    );

  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <Head>
        <title>{data!.egg!.title} - Eggy Workshop</title>
      </Head>

      <h1>Workshop for {data!.egg!.title} </h1>
    </>
  );
};
