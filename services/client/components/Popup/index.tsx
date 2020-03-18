import React, { useRef, useEffect } from "react";

import useKeypress from "hooks/useKeypressed";
import useOnClickOutside from "hooks/useOnClickOutside";

import { PopupContainer, PopupInner } from "./styles";

interface IProps {
  closePopup: () => void;
}

export const Popup: React.FunctionComponent<IProps> = props => {
  const wrapperRef = useRef(null);
  const esc = useKeypress("Escape");

  // check to see if the user clicked outside of this component
  useOnClickOutside(wrapperRef, () => {
    props.closePopup();
  });

  useEffect(() => {
    // if Escape is pressed, close the popup
    if (esc) {
      props.closePopup();
    }
  }, [esc, props]);

  return (
    <PopupContainer>
      <PopupInner ref={wrapperRef}>
        {props.children}
        <button onClick={props.closePopup}>close me</button>
      </PopupInner>
    </PopupContainer>
  );
};
