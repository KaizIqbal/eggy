import React from "react";
import useEggs from "./EggList.hooks";
import InfiniteScroll from "react-infinite-scroll-component";
import UpdateEgg from "../UpdateEgg/UpdateEgg.component";
import DeleteEgg from "../EggDetail/EggDetail.component";

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
        <ul>
          {eggs.map(egg => (
            <li key={egg.id}>
              {egg.title}
              <UpdateEgg id={egg.id} />
              <DeleteEgg id={egg.id}>Delete</DeleteEgg>
            </li>
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  );
};

export default EggList;
