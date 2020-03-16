import { useQuery } from "@apollo/react-hooks";
import { CURSORS_QUERY } from "../../graphql/Query";

interface IArguments {
  flavorname: string;
}

function useCursors({ flavorname }: IArguments) {
  const { data, loading, error } = useQuery(CURSORS_QUERY, {
    variables: {
      flavorname: flavorname
    }
  });

  if (loading) return { loading };
  if (error) return { error };

  return {
    data: data.cursors,
    loading,
    error
  };
}

export default useCursors;
