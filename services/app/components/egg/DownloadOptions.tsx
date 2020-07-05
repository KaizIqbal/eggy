import React from "react";

import { Egg, Flavor } from "generated/graphql";

import { Button } from "components/styled";

interface IProps {
  flavors: Array<Flavor>;
  title: Egg.title;
  platforms: Egg.platforms;
}

export const DownloadOptions: React.FC<IProps> = ({
  flavors,
  title,
  platforms
}) => {
  // ---------------------------------------------------------------- HOOKS
  // ---------------------------------------------------------------- RENDER

  console.log(flavors);
  if (flavors.length === 0) return <p>No Flavors Published</p>;
  return flavors!.map(flavor =>
    platforms.map(platform => (
      <Button
        key={flavor.id}
        onClick={() => {
          console.log("Download Available");
        }}
      >
        {title + " " + flavor.name + " " + platform}
      </Button>
    ))
  );
};
