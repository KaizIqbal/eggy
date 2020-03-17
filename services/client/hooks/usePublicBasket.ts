import { useQuery } from "@apollo/react-hooks";

import updateEggCache from "lib/basketCache";

function usePublicBasket() {
  const { data, loading, fetchMore, error } = useQuery(PUBLIC_BASKET_QUERY, {
    fetchPolicy: "cache-and-network"
  });

  if (loading) return { loading };
  if (error) return { error };
  if (loading && !data.publicBasket) return { loading, eggs: [] };

  const loadMore = () => {
    return fetchMore({
      query: PUBLIC_BASKET_QUERY,
      variables: {
        cursor: data.publicBasket.pageInfo.endCursor
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        return updateEggCache(fetchMoreResult, previousResult);
      }
    });
  };
  return {
    eggs: data.publicBasket.edges.map(({ node }: any) => node),
    hasNextPage: data.publicBasket.pageInfo.hasNextPage,
    loading,
    loadMore,
    error
  };
}
export default usePublicBasket;
