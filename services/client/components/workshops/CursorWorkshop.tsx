import React from "react";
import Head from "next/head";

import { useCursorQuery } from "generated/graphql";

interface IProps {
  id: any;
}

export const CursorWorkshop: React.FC<IProps> = ({ id }) => {
  // ---------------------------------------------------------------- HOOKS
  const { data, loading, error } = useCursorQuery({ variables: { id } });

  // ---------------------------------------------------------------- RENDER

  if (loading)
    return (
      <>
        <Head>
          <title>Loading... - Eggy Workshop</title>
        </Head>
        <p>Workshop Refreshing.....</p>
      </>
    );

  if (error) return <p>Error: {error.message}</p>;

  if (data && data.cursor)
    return (
      <>
        <Head>
          <title>{data.cursor.flavor.egg.title} - Eggy Workshop</title>
        </Head>

        <h1>
          Workshop for {data.cursor.flavor.egg.title} {data.cursor.flavor.name} on {data.cursor.name}
        </h1>
      </>
    );

  return null;
};
