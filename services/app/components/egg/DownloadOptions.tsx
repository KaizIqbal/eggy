import React, { useState } from "react";

import { Flavor } from "generated/graphql";

import { Button } from "components/styled";

interface IProps {
  flavors: Array<Flavor>;
  title: string;
  platforms: Array<string>;
}

export const DownloadOptions: React.FC<IProps> = ({
  flavors,
  title,
  platforms
}) => {
  // ---------------------------------------------------------------- HOOKS

  const [busy, setBusy] = useState(false);

  // ---------------------------------------------------------------- HANDLING FUNCTION

  const handleClick = (id: string, platform: string) => {
    setBusy(true);
    console.log(id + platform + " Downloading...");
    setBusy(false);
  };

  // ---------------------------------------------------------------- RENDER

  return (
    <>
      {flavors.map(flavor =>
        platforms.map(platform => (
          <Button
            disabled={busy}
            key={`${flavor.id}-${platform}`}
            onClick={() => handleClick(flavor.id, platform)}
          >{`${title} ${platform}`}</Button>
        ))
      )}
    </>
  );
};
