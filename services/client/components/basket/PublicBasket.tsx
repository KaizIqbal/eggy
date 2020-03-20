import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import usePublicBasket from "hooks/usePublicBasket";
import { Egg } from "generated/graphql";

import { EggPopup } from "components/egg";

interface IProps {}

export const PublicBasket: React.FC<IProps> = _props => {
  // ---------------------------------------------------------------- HOOKS

  const { eggs, error, loading, loadMore, hasNextPage } = usePublicBasket();

  // ---------------------------------------------------------------- RENDER

  if (loading) return <p>Fetching Eggs...</p>;
  if (error) return <p>Error! ${error.message}</p>;
  if (!eggs) return <p>No Public Egg Found</p>;

  const eggsCount = hasNextPage ? eggs.length + 1 : eggs.length;
  const loadMoreEggs = loading ? () => {} : loadMore;

  return (
    <div>
      <InfiniteScroll
        dataLength={eggsCount}
        next={() => loadMoreEggs}
        hasMore={hasNextPage!}
        loader={<p>Loading...</p>}
        endMessage={<p> There are not more eggs </p>}>
        {eggs.map((egg: Egg) => (
          <li key={egg.id}>
            <EggPopup eggname={egg.eggname}>{egg.title}</EggPopup>{" "}
          </li>
        ))}
      </InfiniteScroll>
    </div>
  );
};
