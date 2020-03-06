import { NextPage } from "next";

// hooks libraries
import { useRouter } from "next/router";

// Components
import {} from "../../components";

// ################################################ NEXT PAGE PROPS ################################################

interface IProps {}

// ################################################ NEXT PAGE ################################################
const SearchResultPage: NextPage<IProps> = props => {
  // ################################################ HOOKS ################################################

  const {
    query: { slug }
  } = useRouter();

  // ################################################ RENDER ################################################

  return <p>Search slug is {slug}</p>;
};

export default SearchResultPage;
