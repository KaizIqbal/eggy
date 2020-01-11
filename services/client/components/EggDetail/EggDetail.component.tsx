import { useQuery } from "@apollo/react-hooks";
import Head from "next/head";
import * as React from "react";
import { EGG_QUERY } from "../../graphql/Query";

// ##### COMPONENT PROPS TYPE #####
interface IDeleteEggProps {
  id: string;
}

// ##### COMPONENT #####
const DeleteEgg: React.FunctionComponent<IDeleteEggProps> = props => {
  // ##### HOOKS #####

  // Fetch data by id using Query Hook
  const { loading, error, data } = useQuery(EGG_QUERY, {
    variables: { id: props.id }
  });

  // ##### RENDER #####

  // Fetching Egg Details
  if (loading) return <p>Loading...</p>;

  // if any error in fetching Data
  if (error) return <p>Error: {error.message}</p>;

  // if egg is empty
  if (!data.egg) return <p>No Egg Found</p>;

  return (
    <>
      {/* Update Header */}
      <Head>
        <title>Eggy | {data.egg.title}</title>
      </Head>

      {/* Details */}
      <h1>Egg Detail</h1>
      <h3>{data.egg.title}</h3>
    </>
  );
};

export default DeleteEgg;
