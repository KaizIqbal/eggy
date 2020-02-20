import { useQuery } from "@apollo/react-hooks";
import { ME_QUERY } from "../../graphql/Query";

function useUser() {
  const { data, loading, error } = useQuery(ME_QUERY, {
    fetchPolicy: "cache-first"
  });

  if (loading) return { loading };
  if (error) return { error };

  return {
    me: data.me,
    loading,
    error
  };
}

export default useUser;
