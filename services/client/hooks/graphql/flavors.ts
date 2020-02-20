import { useQuery } from "@apollo/react-hooks";
import { FLAVORS_QUERY } from "../../graphql/Query";

function useCursors({ eggname }) {
  const { data, loading, error } = useQuery(FLAVORS_QUERY, {
    variables: {
      eggname: eggname
    }
  });

  if (loading) return { loading };
  if (error) return { error };

  return {
    data: data.flavors,
    loading,
    error
  };
}

export default useCursors;
