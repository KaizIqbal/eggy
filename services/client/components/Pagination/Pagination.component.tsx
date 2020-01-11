import { useQuery } from "@apollo/react-hooks";
import Head from "next/head";
import * as React from "react";
import { perPage } from "../../config";
import { PAGINATION_QUERY } from "../../graphql/Query";
import PaginationStyle from "./Pagination.styles";
import Link from "next/link";

// ##### COMPONENT PROPS TYPE #####
interface IPaginationProps {
  page: number;
}

// ##### COMPONENT #####
const Pagination: React.FunctionComponent<IPaginationProps> = props => {
  // ##### HOOKS #####

  // Fetch data by id using Query Hook
  const { loading, error, data } = useQuery(PAGINATION_QUERY);

  // ##### RENDER #####

  // Fetching Egg Details
  if (loading) return <p>Loading...</p>;

  // if any error in fetching Data
  if (error) return <p>Error: {error.message}</p>;

  // Total count return by query
  const count = data.eggsConnection.aggregate.count;
  // Calculate page from count
  const pages = Math.ceil(count / perPage);
  // page number from props (actual page)
  const page = props.page;

  return (
    <PaginationStyle>
      {/* Update Header */}
      <Head>
        <title>Basket - Page {page}</title>
      </Head>
      {/* TODO: Disable on 1st page */}
      {/* Previous Page Button */}
      <Link prefetch href={{ pathname: "basket", query: { page: page - 1 } }}>
        <a>Prev</a>
      </Link>
      <p>
        Page {page} Of {pages}
      </p>
    </PaginationStyle>
  );
};

export default Pagination;
