import React, { useState } from "react";

import { Flavor, useDownloadFlavorMutation } from "generated/graphql";

import { Button } from "components/styled";

interface IProps {
  flavors: Array<Flavor>;
  platforms: Array<string>;
}

export const DownloadOptions: React.FC<IProps> = ({ flavors, platforms }) => {
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

    // cleanup response
    delete data!.downloadFlavor.__typename;

    // Updating info state
    const tempInfo = data!.downloadFlavor;
    setInfo({ ...tempInfo });
  };

  // ---------------------------------------------------------------- RENDER
  if (error) return <p>Error: {error.message}</p>;

  if (loading) return <p>Bundling ..</p>;

  if (!loading && called)
    return (
      <>
        <strong>Generated info:</strong>
        <br />
        <a href={info.link} target="_blank" rel="noopener noreferrer">
          <Button key={info.key}>
            {info.filename + "(" + info.size + ")"}
          </Button>
        </a>
      </>
    );

  return (
    <>
      <strong>Bundle Options:</strong>

      <br />

      {flavors.map(flavor =>
        platforms.map(platform => (
          <Button
            disabled={loading}
            key={`${flavor.id}-${platform}`}
            onClick={() => handleClick(flavor.id, platform)}
          >
            {platform}
          </Button>
        ))
      )}
    </>
  );
};
