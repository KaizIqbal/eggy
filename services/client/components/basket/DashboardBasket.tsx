import React from "react";
import Router from "next/router";
import InfiniteScroll from "react-infinite-scroll-component";

// Components
import { DeleteEgg, PublishEgg } from "../index";
import Link from "../layout/Link";

// Custom Hooks
import useDashboardBasket from "../../hooks/graphql/useDashboardBasket";

// styled components
import { Button } from "../styled";

// Contains all routes
import paths from "../../paths";

// ################################################ COMPONENT'S TYPE ####################################

interface IProps {
  username: any;
}

// ################################################ COMPONENT ###############################################
const DashboardBasket: React.FunctionComponent<IProps> = props => {
  // ################################################ HOOKS ################################################

  const { eggs, error, loading, loadMore, hasNextPage } = useDashboardBasket();

  // ################################################ RENDER #####################################################

  // ####################### Render flow ########################
  // #                                                          #
  // #     (loading) => fetching Data from GraphQl              #
  // #     (error) => handle the Graphql error                  #
  // #     Helper Constants for List                            #
  // #     else => Render Component                             #
  // #                                                          #
  // ############################################################

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
            <Link to={paths.egg(props.username, egg.eggname)}>{egg.title}</Link>
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

export default DashboardBasket;
