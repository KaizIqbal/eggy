import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { CreateEgg, EggList } from "../components";

//For Fetching all Eggs
const EGGS_QUERY = gql`
  query eggs {
    eggs {
      id
      title
    }
  }
`;

//Eggs page
const Eggs = props => {
  // the hook that calls the query.
  const eggs = useQuery(EGGS_QUERY);
  // console.log(eggs);
  return (
    <div>
      <h1>Create Egg Form</h1>
      <CreateEgg />
      <h1>Eggs</h1>
      <EggList eggs={eggs?.data?.eggs||[]} />
    </div>
  );
};

export default Eggs;
export {EGGS_QUERY};
