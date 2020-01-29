function updateEggCache(fetchMoreResult: any, previousResult: any) {
  const newEdges = fetchMoreResult.eggsConnection.edges;
  const pageInfo = fetchMoreResult.eggsConnection.pageInfo;
  return newEdges.length
    ? {
        eggsConnection: {
          __typename: previousResult.eggsConnection.__typename,
          edges: [...previousResult.eggsConnection.edges, ...newEdges],
          pageInfo
        }
      }
    : previousResult;
}
export default updateEggCache;
