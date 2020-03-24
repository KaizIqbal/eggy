import React, { useState } from "react";
import Head from "next/head";

import { useEggLazyQuery } from "generated/graphql";

import { Popup } from "components/Popup";
import { EggCard } from "components/styled/egg";
import { ShowEgg } from ".";

interface IProps {
  eggname: any;
}

export const EggPopup: React.FC<IProps> = ({ eggname, children }) => {
  // ---------------------------------------------------------------- HOOKS

  const [popup, setPopup] = useState(false);
  const [fetchEgg, { data, loading, error }] = useEggLazyQuery({ variables: { eggname } });

  // ---------------------------------------------------------------- HANDLING FUNCTION

  const initPopup = () => {
    fetchEgg();
    togglePopup();
  };

  const togglePopup = () => {
    setPopup(!popup);
    if (popup) {
      window.history.pushState("", "", "/basket");
    } else {
      window.history.pushState("", "", `/egg/${eggname}`);
    }
  };

  // ---------------------------------------------------------------- RENDER

  let body: any = null;

  if (loading) {
    body = (
      <>
        <Head>
          <title>Loading... - Eggy Basket</title>
        </Head>
        <p>Fetching Egg.....</p>
      </>
    );
  } else if (error) {
    body = <p>Error: {error.message}</p>;
  } else if (data && data.egg) {
    body = <ShowEgg egg={data.egg} />;
  } else {
    body = (
      <>
        <h1>Opps... </h1>
        <p>No Egg Found</p>
      </>
    );
  }

  return (
    <>
      <EggCard onClick={initPopup}>{children}</EggCard>
      {popup ? (
        <>
          <Popup closePopup={togglePopup}>{body}</Popup>
        </>
      ) : null}
    </>
  );
};
