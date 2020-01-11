import { CreateEgg, EggList } from "../components";
import { EGGS_QUERY } from "../graphql/Query";

//Eggs page
const Basket = props => {
  return (
    <div>
      <h1>Create Egg Form</h1>
      <CreateEgg />
      <h1>Eggs</h1>
      <EggList page={parseFloat(props.query.page) || 1} />
    </div>
  );
};

export default Basket;
export { EGGS_QUERY };
