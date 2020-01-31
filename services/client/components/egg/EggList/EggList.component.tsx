import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import usePublishedEggs from "../../../hooks/publishedEggs";

// ##### COMPONENT PROPS TYPE #####

interface IEggListProps {}

// ##### COMPONENT #####

const EggList: React.FunctionComponent<IEggListProps> = props => {
  // ##### HOOKS #####

  const { eggs, error, loading, loadMore, hasNextPage } = usePublishedEggs();

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
            <h4>{egg.title}</h4> <p>by {egg.user.name}</p>
          </li>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default EggList;
