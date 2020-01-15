import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import DeleteEgg from "../DeleteEgg/DeleteEgg.component";
import useEggs from "./EggList.hooks";
import { Button } from "../DeleteEgg/DeleteEgg.styles";
import Router from "next/router";

// ##### COMPONENT PROPS TYPE #####

interface IEggListProps {}

// ##### COMPONENT #####

const EggList: React.FunctionComponent<IEggListProps> = props => {
  // ##### HOOKS #####

  const { eggs, error, loading, loadMore, hasNextPage } = useEggs();

  // ##### RENDER #####

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! ${error.message}</p>;

  const eggsCount = hasNextPage ? eggs.length + 1 : eggs.length;
  const loadMoreEggs = loading ? () => {} : loadMore;

  return (
    <div>
      <InfiniteScroll
        dataLength={eggsCount}
        next={loadMoreEggs}
        hasMore={hasNextPage}
        loader={<p>Loading..</p>}
        endMessage={<p>There not more eggs</p>}
      >
        {eggs.map(egg => (
          <li key={egg.id}>
            {egg.title}
            <Button
              type="button"
              onClick={() => {
                Router.push({
                  pathname: "/update",
                  query: {
                    id: egg.id
                  }
                });
              }}
            >
              Update
            </Button>
            <DeleteEgg id={egg.id}>Delete</DeleteEgg>
          </li>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default EggList;
