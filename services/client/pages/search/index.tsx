import React from "react";
import { NextPage } from "next";

// hooks libraries
import { useRouter } from "next/router";

// Components
import {} from "../../components";

// ################################################ NEXT PAGE PROPS ################################################

interface IProps {}

// ################################################ NEXT PAGE ################################################
const SearchPage: NextPage<IProps> = _props => {
  // ################################################ RENDER ################################################

  return <h1>Search Page</h1>;
};

export default SearchPage;
