import { useQuery } from "@apollo/react-hooks";
import { EGGS_QUERY, GET_EGGS_CURSOR } from "../../graphql/Query";

function useEggs() {
  const { data, loading, fetchMore } = useQuery(GET_EGGS_CURSOR, {
    notifyOnNetworkStatusChange: true
  });

  if (loading && !data.eggs) return { loading, eggs: [] };

  const loadMore = () => {
    return fetchMore({
      query: EGGS_QUERY,
      variables: {
        cursor: data.eggs.pageInfo.endCursor
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult.eggs.edges;
        const pageInfo = fetchMoreResult.eggs.pageInfo;
        return newEdges.length
          ? {
              eggs: {
                __typename: previousResult.eggs.__typename,
                edges: [...previousResult.eggs.edges, ...newEdges],
                pageInfo
              }
            }
          : previousResult;
      }
    });
  };
  return {
    eggs: data.eggs.edges.map(({ node }) => node),
    hasNextPage: data.eggs.pageInfo.hasNextPage,
    loading,
    loadMore
  };
}
export default useEggs;
