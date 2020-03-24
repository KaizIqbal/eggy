import React from "react";
import Router from "next/router";
import InfiniteScroll from "react-infinite-scroll-component";

import { Egg, useUserBasketQuery, UserBasketDocument } from "generated/graphql";

import { UpdateEgg, PublishEgg, UnPublishEgg, DeleteEgg } from "components/egg";
import { Button } from "components/styled";

interface IProps {}

export const UserBasket: React.FC<IProps> = _props => {
  // ---------------------------------------------------------------- HOOKS

  const { data, loading, fetchMore, called, error } = useUserBasketQuery({
    fetchPolicy: "cache-and-network"
  });

  // ---------------------------------------------------------------- HELPER

  if ((loading && !called) || !data) return <p>Fetching User's Eggs...</p>;
  if (error) return <p>Error! ${error.message}</p>;

  const loadMore = () => {
    return fetchMore({
      query: UserBasketDocument,
      variables: {
        cursor: data.userBasket.pageInfo.endCursor
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult!.userBasket.edges;
        const pageInfo = fetchMoreResult!.userBasket.pageInfo;
        return newEdges.length
          ? {
              userBasket: {
                __typename: previousResult.userBasket.__typename,
                edges: [...previousResult.userBasket.edges, ...newEdges],
                pageInfo
              }
            }
          : previousResult;
      }
    });
  };

  const eggs = data.userBasket.edges.map(({ node }: any) => node);
  const hasNextPage = data.userBasket.pageInfo.hasNextPage;

  const eggsCount = hasNextPage ? eggs.length + 1 : eggs.length;
  const loadMoreEggs = loading ? () => {} : loadMore;

  // ---------------------------------------------------------------- RENDER

  return (
    <InfiniteScroll
      dataLength={eggsCount}
      next={loadMoreEggs}
      hasMore={hasNextPage}
      loader={<p>Loading...</p>}
      endMessage={<p> There are not more eggs </p>}>
      {eggs.map((egg: Egg) => (
        <li key={egg.id}>
          {egg.title + " "}
          <Button
            onClick={() => {
              Router.push("/workshop/[...slugs]", `/workshop/${egg.eggname}`);
            }}>
            Workshop
          </Button>
          <Button
            onClick={() => {
              Router.push("/egg/[eggname]", `/egg/${egg.eggname}`);
            }}>
            Page
          </Button>
          <UpdateEgg egg={egg} />
          <DeleteEgg id={egg.id} />
          {egg.isPublished ? <UnPublishEgg id={egg.id} /> : <PublishEgg id={egg.id} />}
        </li>
      ))}
    </InfiniteScroll>
  );
};
