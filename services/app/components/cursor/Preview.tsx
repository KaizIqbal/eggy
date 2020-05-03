import React, { useState } from "react";

import { Button } from "components/styled";

import { Popup } from "components/Popup";

interface IProps {}

export const CreateCursor: React.FC<IProps> = ({}) => {
  // ---------------------------------------------------------------- HOOKS

  const [popup, setPopup] = useState(false);

  // ---------------------------------------------------------------- HANDLING FUNCTION

  const togglePopup = () => {
    setPopup(!popup);
  };

  // ---------------------------------------------------------------- RENDER

  return (
    <>
      <Button onClick={togglePopup}>+ Add Cursor</Button>
      {popup ? (
        <Popup closePopup={togglePopup}>
          <br />
          {body}
        </Popup>
      ) : null}
    </>
  );
};
