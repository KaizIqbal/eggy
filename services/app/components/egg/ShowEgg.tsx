import React from "react";
import Head from "next/head";
import { Egg } from "generated/graphql";
import { Button } from "components/styled";

interface IProps {
  egg: any;
}

export const ShowEgg: React.FC<IProps> = props => {
  const egg: Egg = props.egg;

  // ---------------------------------------------------------------- RENDER
  return (
    <>
      <Head>
        <title>{egg.title} - Eggy Basket</title>
      </Head>
      {/* Details */}
      <div>
        <h1>{egg.title}</h1>
      </div>
      <p>by {egg.user.firstName + " " + egg.user.lastName}</p>
      <strong>Available Download for:</strong>
      <br />
      {egg.flavors.length === 0 ? (
        <p>No Flavors Published</p>
      ) : (
        egg.flavors.map(flavor =>
          egg.platforms.map(platform => (
            <Button
              key={flavor.id}
              onClick={() => {
                console.log("Download Available");
              }}
            >
              {egg.title + " " + flavor.name + " " + platform}
            </Button>
          ))
        )
      )}
    </>
  );
};
