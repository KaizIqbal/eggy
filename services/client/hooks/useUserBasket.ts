import { useUserBasketQuery, UserBasketDocument } from "generated/graphql";
import updateEggCache from "lib/basketCache";

function useUserBasket() {
  const { data, loading, fetchMore, error } = useUserBasketQuery({
    fetchPolicy: "cache-and-network"
  });

  if (loading) return { loading };
  if (error) return { error };
  if (!data) return { eggs: undefined };

  const loadMore = () => {
    return fetchMore({
      query: UserBasketDocument,
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
export default useUserBasket;
