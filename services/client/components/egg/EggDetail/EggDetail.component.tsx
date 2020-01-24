import { useQuery } from "@apollo/react-hooks";
import Head from "next/head";
import React from "react";
import { EGG_QUERY } from "../../../graphql/Query";

// ##### COMPONENT PROPS TYPE #####
interface IEggDetailProps {
  id: string;
}

// ##### COMPONENT #####
const EggDetail: React.FunctionComponent<IEggDetailProps> = props => {
  // ##### HOOKS #####

  // Fetch data by id using Query Hook
  const { loading, error, data } = useQuery(EGG_QUERY, {
    variables: { id: props.id }
  });

  // ##### RENDER #####

  // Fetching Egg Details
  if (loading) return <p>Fetching data about Egg...</p>;

  // if any error in fetching Data
  if (error) return <p>Error: {error.message}</p>;

  // if egg is empty
  if (!data.egg) return <p>No Egg Found</p>;

  return (
    <div>
      {/* Update Header */}
      <Head>
        <title>Eggy | {data.egg.title}</title>
      </Head>

      {/* Details */}
      <h1>Egg Detail</h1>
      <h3>{data.egg.title}</h3>
    </div>
  );
};

export default EggDetail;
