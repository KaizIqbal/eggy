import Router from "next/router";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import DeleteEgg from "../DeleteEgg/DeleteEgg.component";
import { Button } from "../DeleteEgg/DeleteEgg.styles";
import useEggs from "./EggList.hooks";
import {} from "./EggList.styles";

// ##### COMPONENT PROPS TYPE #####

interface IEggListProps {}

// ##### COMPONENT #####

const EggList: React.FunctionComponent<IEggListProps> = props => {
  // ##### HOOKS #####

  const { eggs, error, loading, loadMore, hasNextPage } = useEggs();

  // ##### RENDER #####

  if (loading) return <p>Fetching Eggs...</p>;
  if (error) return <p>Error! ${error.message}</p>;

  const eggsCount = hasNextPage ? eggs.length + 1 : eggs.length;
  const loadMoreEggs = loading ? () => {} : loadMore;

  return (
    <div>
      <InfiniteScroll
        dataLength={eggsCount}
        next={loadMoreEggs}
        hasMore={hasNextPage}
        loader={<p>Loading...</p>}
        endMessage={<p>There not more eggs</p>}
      >
        {eggs.map(egg => (
          <li key={egg.id}>
            {egg.title}
            <Button
              type="button"
              onClick={() => {
                Router.push({
                  pathname: "/basket/update",
                  query: {
                    id: egg.id
                  }
                });
              }}
            >
              Update
            </Button>
            <DeleteEgg id={egg.id} />
          </li>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default EggList;
