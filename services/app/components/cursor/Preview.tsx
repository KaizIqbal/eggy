import React, { useState } from "react";

import { RenderFile } from "generated/graphql";

import { Button } from "components/styled";
import { Wrapper, Frame } from "components/styled/cursor/Preview";
import { Popup } from "components/Popup";

interface IProps {
  images: any;
}

export const PreviewCursor: React.FC<IProps> = ({ images }) => {
  // ---------------------------------------------------------------- HOOKS

  const [popup, setPopup] = useState(false);

  // ---------------------------------------------------------------- HANDLING FUNCTION

  const togglePopup = () => {
    setPopup(!popup);
  };

  // ---------------------------------------------------------------- RENDER

  return (
    <>
      <Button onClick={togglePopup}>Preview</Button>
      {popup ? (
        <Popup closePopup={togglePopup}>
          <br />
          <Wrapper>
            {images.map((image: RenderFile) => (
              <Frame src={image.url} />
            ))}
          </Wrapper>
        </Popup>
      ) : null}
    </>
  );
};
