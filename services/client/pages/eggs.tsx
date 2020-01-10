import { useQuery } from "@apollo/react-hooks";
import { CreateEgg, EggList } from "../components";
import {EGGS_QUERY} from "../graphql/Query"

//Eggs page
const Eggs = props => {
  // the hook that calls the query.
  const eggs = useQuery(EGGS_QUERY,{pollInterval:500});
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
export { EGGS_QUERY };

