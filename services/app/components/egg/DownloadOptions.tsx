import React, { useState } from "react";

import { Flavor, useDownloadFlavorMutation } from "generated/graphql";

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

  const [info, setInfo] = useState({
    filename: "",
    size: "",
    key: "",
    link: ""
  });
  const [
    downloadFlavor,
    { loading, error, called }
  ] = useDownloadFlavorMutation();

  // ---------------------------------------------------------------- HANDLING FUNCTION

  const handleClick = async (id: string, platform: any) => {
    const { data } = await downloadFlavor({
      variables: { id: id, type: platform }
    });
    delete data!.downloadFlavor.__typename;
    setInfo(...data!.downloadFlavor);
  };

  // ---------------------------------------------------------------- RENDER

  if (error) return <p>Error: {error.message}</p>;

  if (loading)
    return (
      <p>
        <strong>{title}</strong> Generating ..
      </p>
    );
  if (!loading && called)
    return (
      <>
        <p>Generated info:</p>
      </>
    );

  return (
    <>
      {flavors.map(flavor =>
        platforms.map(platform => (
          <Button
            disabled={loading}
            key={`${flavor.id}-${platform}`}
            onClick={() => handleClick(flavor.id, platform)}
          >
            {`${title} ${platform}`}
          </Button>
        ))
      )}
    </>
  );
};
