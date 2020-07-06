import React from "react";

import { Flavor, useFlavorDownloadMuation } from "generated/graphql";

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

  const [downloadFalvor, { loading, error }] = useFlavorDownloadMuation();

  // ---------------------------------------------------------------- HANDLING FUNCTION

  const handleClick = (id: string, platform: string) => {
    downloadFalvor({ varaiables: { id: id, type: platform } });
  };

  // ---------------------------------------------------------------- RENDER

  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      {flavors.map(flavor =>
        platforms.map(platform => (
          <Button
            disabled={loading}
            key={`${flavor.id}-${platform}`}
            onClick={() => handleClick(flavor.id, platform)}
          >{`${title} ${platform}`}</Button>
        ))
      )}
    </>
  );
};
