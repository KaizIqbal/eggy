import { useQuery } from "@apollo/react-hooks";
import { FLAVOURS_QUERY } from "../graphql/Query";

function useCursors({ eggId }) {
  const { data, loading, error } = useQuery(FLAVOURS_QUERY, {
    variables: {
      eggId: eggId
    }
  });

  if (loading) return { loading };
  if (error) return { error };

  return {
    data: data.flavours,
    loading,
    error
  };
}

export default useCursors;
