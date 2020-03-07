import React from "react";
import { NextPage } from "next";

// Components
import { PublicBasket } from "../components";

// ################################################ NEXT PAGE PROPS ################################################

interface IProps {}

// ################################################ NEXT PAGE ################################################
const Basket: NextPage<IProps> = _props => {
  return (
    <div>
      <h1>Eggs</h1>
      <PublicBasket />
    </div>
  );
};

export default Basket;
