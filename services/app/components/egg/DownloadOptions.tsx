import React from "react";

import { Platform, Flavor, Maybe } from "generated/graphql";

import { Button } from "components/styled";

interface IProps {
  flavors: Maybe<Array<Flavor>>;
  title: string;
  platforms: Array<Platform>;
}

export const DownloadOptions: React.FC<IProps> = ({
  flavors,
  title,
  platforms
}) => {
  // ---------------------------------------------------------------- HOOKS
  // ---------------------------------------------------------------- RENDER
  if (flavors!.length === 0) return <p>No Flavors Published</p>;
  return flavors!.map(flavor =>
    platforms.map(platform => (
      <Button
        key={flavor.id + "_" + platform}
        onClick={() => {
          console.log("Download Available");
        }}
      >
        {title + " " + flavor.name + " " + platform}
      </Button>
    ))
  );
};
