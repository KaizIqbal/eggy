import React from "react";
import Router from "next/router";
import InfiniteScroll from "react-infinite-scroll-component";

import useUserBasket from "hooks/useUserBasket";
import { Egg } from "generated/graphql";

import { UpdateEgg, PublishEgg, UnPublishEgg, DeleteEgg } from "components/egg";
import { Button } from "components/styled";

interface IProps {}

export const UserBasket: React.FC<IProps> = _props => {
  // ---------------------------------------------------------------- HOOKS

  const { eggs, error, loading, loadMore, hasNextPage } = useUserBasket();

  // ---------------------------------------------------------------- RENDER

  if (loading) return <p>Fetching Eggs...</p>;
  if (error) return <p>Error! ${error.message}</p>;
  if (!eggs) return <p>No Egg Found</p>;
  console.log(hasNextPage);
  if (hasNextPage === undefined) {
    return <p>Fetching Eggs...</p>;
  }

  const eggsCount = hasNextPage ? eggs.length + 1 : eggs.length;
  const loadMoreEggs = loading ? () => {} : () => loadMore;

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
            {egg.title + " "}

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
    </>
  );
};
