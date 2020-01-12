import React from "react";
import useEggs from "./EggList.hooks";

// ##### COMPONENT PROPS TYPE #####

interface IEggListProps {}

// ##### COMPONENT #####

const EggList: React.FunctionComponent<IEggListProps> = props => {
  // ##### CUSTOM HOOKS #####

  const { eggs, loading, loadMore, hasNextPage } = useEggs();

  // ##### VARIABLES #####

  const eggsCount = hasNextPage ? eggs.length + 1 : eggs.length;
  const loadMoreEggs = loading ? () => {} : loadMore;
  const isEggLoaded = index => !hasNextPage || index < eggs.length;

  // ##### RENDER #####
  return <></>;
};

export default EggList;
