import { useQuery } from "@apollo/react-hooks";
import * as React from "react";
import { PAGINATION_QUERY } from "../../graphql/Query";
import PaginationStyle from "./Pagination.styles";
import { perPage } from "../../config";

// Pagination Component
interface IPaginationProps {}

const Pagination: React.FunctionComponent<IPaginationProps> = props => {
  // Fetch data by id using Query Hook
  const { loading, error, data } = useQuery(PAGINATION_QUERY);
  // console.log(data);

  // rendering part

  // Fetching Egg Details
  if (loading) return <p>Loading...</p>;
  // if any error in fetching Data
  if (error) return <p>Error: {error.message}</p>;

  ///Total count return by query
  const count = data.eggsConnection.aggregate.count;
  const page = Math.ceil(count / perPage);
  return <PaginationStyle>Page 1 Of {page}</PaginationStyle>;
};

export default Pagination;
