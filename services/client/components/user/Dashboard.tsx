import React from "react";
import { UserBasket } from "components/basket";
import { CreateEgg } from "components/egg";

interface IProps {}

export const Dashboard: React.FC<IProps> = _props => {
  return (
    <>
      <h1> 🧺 User Basket </h1>
      <CreateEgg />
      <UserBasket />
    </>
  );
};
