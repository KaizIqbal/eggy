import { EggList } from "../../components";
//##### PAGE #####
const Basket = props => {
  return (
    <div>
      <h1>Eggs</h1>
      <a href="/basket/add">+Add Egg</a>
      <EggList />
    </div>
  );
};

export default Basket;
