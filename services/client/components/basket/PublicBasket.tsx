import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

// Components
import Link from "../layout/Link";

// Custom Hooks
import usePublicBasket from "../../hooks/graphql/usePublicBasket";

// Contains all routes
import paths from "../../paths";

// ################################################ COMPONENT'S TYPE ####################################

interface IProps {}

// ################################################ COMPONENT ###############################################
const PublicBasket: React.FunctionComponent<IProps> = props => {
  // ################################################ HOOKS ################################################

  const { eggs, error, loading, loadMore, hasNextPage } = usePublicBasket();

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
            <Link to={paths.egg(egg.eggname)}>
              <h4>{egg.title}</h4>
            </Link>
            <p>by {egg.user.name}</p>
            Available for:
            {egg.cursorTypes.map(cursorType => (
              <p key={cursorType}>{cursorType}</p>
            ))}
          </li>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default PublicBasket;
