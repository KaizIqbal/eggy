import { useQuery } from "@apollo/react-hooks";
import { GET_EGGS_CURSOR } from "../graphql/Query";
import updateEggCache from "../utils/updateEggCache";

function useEggs() {
  const { data, loading, fetchMore, error } = useQuery(GET_EGGS_CURSOR);

  if (loading) return { loading };
  if (error) return { error };
  if (loading && !data.eggsConnection) return { loading, eggs: [] };

  const loadMore = () => {
    return fetchMore({
      query: GET_EGGS_CURSOR,
      variables: {
        cursor: data.eggsConnection.pageInfo.endCursor
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        return updateEggCache(fetchMoreResult, previousResult);
      }
    });
  };
  return {
    eggs: data.eggsConnection.edges.map(({ node }) => node),
    hasNextPage: data.eggsConnection.pageInfo.hasNextPage,
    loading,
    loadMore,
    error
  };
}
export default useEggs;
