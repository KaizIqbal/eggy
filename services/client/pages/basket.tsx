import { NextPage } from "next";

// Components
import { PublicBasket } from "../components";

// ################################################ NEXT PAGE PROPS ################################################

interface IProps {}

// ################################################ NEXT PAGE ################################################
const Basket: NextPage<IProps> = props => {
  return (
    <div>
      <h1>Eggs</h1>
      <PublicBasket />
    </div>
  );
};

export default Basket;
