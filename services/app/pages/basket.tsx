import React from "react";
import Page from "components/Page";
import { PublicBasket } from "components/basket";

export default () => {
  return (
    <Page title="Eggy Basket">
      <h1>
        <span role="img" aria-label="Hi">
          🧺
        </span>
        Basket
      </h1>
      <PublicBasket />
    </Page>
  );
};
