import React from "react";
import Head from "next/head";

import { useFlavorQuery } from "generated/graphql";
import { CreateCursor, Cursors } from "components/cursor";

interface IProps {
  id: any;
}

export const FlavorWorkshop: React.FC<IProps> = ({ id }) => {
  // ---------------------------------------------------------------- HOOKS
  const { data, loading, error } = useFlavorQuery({ variables: { id } });

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

  if (data && data.flavor)
    return (
      <>
        <Head>
          <title>{data.flavor.egg.title} - Eggy Workshop</title>
        </Head>

        <h1>
          Workshop for {data.flavor.egg.title} {data.flavor.name}
        </h1>

        <CreateCursor flavorId={data.flavor.id} />
        <Cursors flavorId={data.flavor.id} />
      </>
    );

  return null;
};
