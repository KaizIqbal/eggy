import React from "react";
import Page from "components/Page";
import { UserBasket } from "components/basket";
import { CreateEgg } from "components/egg";

export default () => {
  return (
    <Page>
      <h1> 🧺 User Basket </h1>
      <CreateEgg />
      <UserBasket />
    </Page>
  );
};
