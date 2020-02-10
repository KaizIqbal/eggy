import { useQuery } from "@apollo/react-hooks";
import Head from "next/head";
import React from "react";
import { EGG_QUERY } from "../../graphql/Query";

// ##### COMPONENT PROPS TYPE #####
interface IEggProps {
  eggname: any;
}

// ##### COMPONENT #####
const Egg: React.FunctionComponent<IEggProps> = props => {
  // ##### HOOKS #####
  // Fetch data by name using Query Hook
  const { loading, error, data } = useQuery(EGG_QUERY, {
    variables: { eggname: props.eggname }
  });

  // ##### RENDER #####
  // Fetching Egg Details
  if (loading) return <p>Fetching data about Egg...</p>;

  // if any error in fetching Data
  if (error) return <p>Error: {error.message}</p>;

  // if egg is empty
  if (!props.eggname || !data.egg) return <p>No Egg Found</p>;

  // Return Egg Details
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

export default Egg;
