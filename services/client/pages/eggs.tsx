import { CreateEgg, EggList } from "../components";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const Eggs = props => {
  const EGGS_QUERY = gql`
    query eggs {
      eggs {
        id
        title
      }
    }
  `;

  // the hook that calls the query.
  const eggs = useQuery(EGGS_QUERY,{ pollInterval: 500 });
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
