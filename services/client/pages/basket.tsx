import { useQuery } from "@apollo/react-hooks";
import { CreateEgg, EggList ,Pagination} from "../components";
import {EGGS_QUERY} from "../graphql/Query"

//Eggs page
const Basket = props => {
  // the hook that calls the query.
  const eggs = useQuery(EGGS_QUERY);
  // console.log(eggs);
  return (
    <div>
      <h1>Create Egg Form</h1>
      <CreateEgg />
      <h1>Eggs</h1>
      <Pagination />
      <EggList eggs={eggs?.data?.eggs||[]} />
      <Pagination />  
    </div>
  );
};

export default Basket;
export { EGGS_QUERY };

