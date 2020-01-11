import { useQuery } from "@apollo/react-hooks";
import * as React from "react";
import { PAGINATION_QUERY } from "../../graphql/Query";
import PaginationStyle from "./Pagination.styles";

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

  return (
    <PaginationStyle>
      Pagination {data.eggsConnection.aggregate.count}
    </PaginationStyle>
  );
};

export default Pagination;
