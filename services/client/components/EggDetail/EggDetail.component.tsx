import { useQuery } from "@apollo/react-hooks";
import * as React from "react";
import { EGG_QUERY } from "../../graphql/Query";

// DeleteEgg Component
interface IDeleteEggProps {
  id: any;
}

const DeleteEgg: React.FunctionComponent<IDeleteEggProps> = props => {
  // Fetch data by id using Query Hook
  const { loading, error, data } = useQuery(EGG_QUERY, {
    variables: { id: props.id }
  });

  // rendering part
  // Fetching Egg Details
  if (loading) return <p>Loading...</p>;
  // if any error in fetching Data
  if (error) return <p>Error: {error.message}</p>;
  // if Data is not existed
  if (!data.egg) return <p>No Egg Found</p>;

  return (
    <div>
      <h1>Egg Detail</h1>
      <h3>{data.egg.title}</h3>
    </div>
  );
};

export default DeleteEgg;
