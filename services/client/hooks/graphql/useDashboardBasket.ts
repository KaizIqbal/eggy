import { useQuery } from "@apollo/react-hooks";

// Mutation & Query
import { USER_BASKET_QUERY } from "../../graphql/Query";

// Utils
import updateEggCache from "../../utils/updateEggCache";

function useDashboardBasket() {
  const { data, loading, fetchMore, error } = useQuery(USER_BASKET_QUERY, {
    fetchPolicy: "cache-and-network"
  });

  if (loading) return { loading };
  if (error) return { error };
  if (loading && !data.userBasket) return { loading, eggs: [] };

  const loadMore = () => {
    return fetchMore({
      query: USER_BASKET_QUERY,
      variables: {
        cursor: data.userBasket.pageInfo.endCursor
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        return updateEggCache(fetchMoreResult, previousResult);
      }
    });
  };
  return {
    eggs: data.userBasket.edges.map(({ node }: any) => node),
    hasNextPage: data.userBasket.pageInfo.hasNextPage,
    loading,
    loadMore,
    error
  };
}
export default useDashboardBasket;
