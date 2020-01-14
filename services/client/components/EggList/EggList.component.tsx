import React from "react";
import useEggs from "./EggList.hooks";
import { List, AutoSizer, ScrollSync } from "react-virtualized";

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
  const isPersonLoaded = index => !hasNextPage || index < eggs.length;

  // Binds our scroll event handler
  const handleScroll = (e: any) => {
    console.log(e);
    // Bails early if:
    // * there's an error
    // * it's already loading
    // * there's nothing left to load
    // if (error || loading || !hasNextPage) return;

    // // Checks that the page has scrolled to the bottom
    // if (
    //   window.innerHeight + document.documentElement.scrollTop ===
    //   document.documentElement.offsetHeight
    // ) {
    //   loadMore();
    // }
  };

  const rowRenderer = ({ index, key, style }) => {
    let content;
    if (!isPersonLoaded(index)) {
      content = "Loading...";
    } else {
      const { title } = eggs[index];
      content = `${title}`;
    }
    return (
      <div key={key} style={style} className="row">
        <div className="content">
          <div>{content}</div>
        </div>
      </div>
    );
  };
  return (
    <ScrollSync>
      {({ onScroll }) => (
        <AutoSizer>
          {({ width, height }) => (
            <List
              width={width}
              height={height}
              rowHeight={30}
              onScroll={onScroll}
              rowRenderer={rowRenderer}
              rowCount={eggsCount}
            >
              {/* For User */}
              {error && <div>{error}</div>}
              {loading && <div>Loading...</div>}
              {!hasNextPage && <div>You did it! You reached the end!</div>}
            </List>
          )}
        </AutoSizer>
      )}
    </ScrollSync>
  );
};

export default EggList;
