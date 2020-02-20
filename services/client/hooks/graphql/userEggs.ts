import { useQuery } from "@apollo/react-hooks";
import { GET_USER_EGGS_CURSOR } from "../../graphql/Query";
import updateEggCache from "../../utils/updateEggCache";

function useUserEggs() {
  const { data, loading, fetchMore, error } = useQuery(GET_USER_EGGS_CURSOR, {
    fetchPolicy: "cache-and-network"
  });

  if (loading) return { loading };
  if (error) return { error };
  if (loading && !data.userEggsConnection) return { loading, eggs: [] };

  const loadMore = () => {
    return fetchMore({
      query: GET_USER_EGGS_CURSOR,
      variables: {
        cursor: data.userEggsConnection.pageInfo.endCursor
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        return updateEggCache(fetchMoreResult, previousResult);
      }
    });
  };
  return {
    eggs: data.userEggsConnection.edges.map(({ node }) => node),
    hasNextPage: data.userEggsConnection.pageInfo.hasNextPage,
    loading,
    loadMore,
    error
  };
}
export default useUserEggs;
