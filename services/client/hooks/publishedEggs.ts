import { useQuery } from "@apollo/react-hooks";
import { GET_EGGS_CURSOR } from "../graphql/Query";
import updateEggCache from "../utils/updateEggCache";

function usePublishedEggs() {
  const { data, loading, fetchMore, error } = useQuery(GET_EGGS_CURSOR, {
    fetchPolicy: "cache-and-network"
  });

  if (loading) return { loading };
  if (error) return { error };
  if (loading && !data.publishedEggsConnection) return { loading, eggs: [] };

  const loadMore = () => {
    return fetchMore({
      query: GET_EGGS_CURSOR,
      variables: {
        cursor: data.publishedEggsConnection.pageInfo.endCursor
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        return updateEggCache(fetchMoreResult, previousResult);
      }
    });
  };
  return {
    eggs: data.publishedEggsConnection.edges.map(({ node }) => node),
    hasNextPage: data.publishedEggsConnection.pageInfo.hasNextPage,
    loading,
    loadMore,
    error
  };
}
export default usePublishedEggs;
