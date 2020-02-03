import Router from "next/router";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useUserEggs from "../../../hooks/userEggs";
import DeleteEgg from "../DeleteEgg/DeleteEgg.component";
import PublishEgg from "../PublishEgg/PublishEgg.component";
import { Button } from "../DeleteEgg/DeleteEgg.styles";
import Link from "next/link";

// ##### COMPONENT PROPS TYPE #####

interface IEggListProps {
  username: any;
}

// ##### COMPONENT #####

const UserEggList: React.FunctionComponent<IEggListProps> = props => {
  // ##### HOOKS #####

  const { eggs, error, loading, loadMore, hasNextPage } = useUserEggs();

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
            <Link
              href="/[user]/[egg]/workshop"
              as={`/${props.username}/${egg.eggname}/workshop`}
            >
              <a>{egg.title}</a>
            </Link>
            <Button
              type="button"
              onClick={() => {
                Router.push(
                  "/[user]/[egg]/update",
                  `/${props.username}/${egg.eggname}/update`
                );
              }}
            >
              Update
            </Button>

            <DeleteEgg eggname={egg.eggname} />
            <PublishEgg id={egg.id} isPublished={egg.isPublished} />
          </li>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default UserEggList;
