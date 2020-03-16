import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

// Components
import { Egg } from "../../../components";

// ################################################ NEXT PAGE PROPS ################################################

interface IProps {}

// ################################################ NEXT PAGE ################################################
const EggPage: NextPage<IProps> = _props => {
  // ################################################ HOOKS ################################################

  const {
    query: { eggname }
  } = useRouter();

  // ################################################ RENDER ################################################

  return (
    <>
      <Egg eggname={eggname} />
    </>
  );
};

export default EggPage;
