import * as React from "react";
import useEggs from "./EggList.hooks";

// ##### COMPONENT PROPS TYPE #####

interface IEggListProps {}

// ##### COMPONENT #####

const EggList: React.FunctionComponent<IEggListProps> = props => {
  // ##### HOOKS #####

  const { eggs, error, loading, loadMore, hasNextPage } = useEggs();

  // ##### RENDER #####
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! ${error.message}</p>;
  console.log(eggs);

  // // ##### VARIABLES #####

  // const eggsCount = hasNextPage ? eggs.length + 1 : Object.keys(eggs).length;
  // const loadMoreEggs = loading ? () => {} : loadMore;
  // const isEggLoaded = index => !hasNextPage || index < Object.keys(eggs).length;

  return <></>;
};

export default EggList;
