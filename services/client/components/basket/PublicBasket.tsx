import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { Egg, usePublicBasketQuery, PublicBasketDocument } from "generated/graphql";

import { EggPopup } from "components/egg";

interface IProps {}

export const PublicBasket: React.FC<IProps> = _props => {
  // ---------------------------------------------------------------- HOOKS

  const { data, loading, fetchMore, called, error } = usePublicBasketQuery({
    fetchPolicy: "cache-and-network"
  });

  // ---------------------------------------------------------------- HELPER

  if ((loading && !called) || !data) return <p>Fetching Public Eggs...</p>;
  if (error) return <p>Error! ${error.message}</p>;

  const loadMore = () => {
    return fetchMore({
      query: PublicBasketDocument,
      variables: {
        cursor: data!.publicBasket.pageInfo.endCursor
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult!.publicBasket.edges;
        const pageInfo = fetchMoreResult!.publicBasket.pageInfo;
        return newEdges.length
          ? {
              publicBasket: {
                __typename: previousResult.publicBasket.__typename,
                edges: [...previousResult.publicBasket.edges, ...newEdges],
                pageInfo
              }
            }
          : previousResult;
      }
    });
  };

  const eggs = data.publicBasket.edges.map(({ node }: any) => node);
  const hasNextPage = data.publicBasket.pageInfo.hasNextPage;

  const eggsCount = hasNextPage ? eggs.length + 1 : eggs.length;
  const loadMoreEggs = loading ? () => {} : loadMore;

  // ---------------------------------------------------------------- RENDER

  return (
    <>
      <InfiniteScroll
        dataLength={eggsCount}
        next={loadMoreEggs}
        hasMore={hasNextPage}
        loader={<p>Loading...</p>}
        endMessage={<p> There are not more eggs </p>}>
        {eggs.map((egg: Egg) => (
          <li key={egg.id}>
            <EggPopup eggname={egg.eggname}>{egg.title}</EggPopup>
          </li>
        ))}
      </InfiniteScroll>
    </>
  );
};
