import DOMPurify from "dompurify";
import React, { useEffect, useRef, useState } from "react";
import useKeypress from "../../../hooks/layout/inlineEdit/useKeypressed";
import useOnClickOutside from "../../../hooks/layout/inlineEdit/useOnClickOutside";
import { InlineEditInput, InlineEditText } from "./styles";

function InlineEdit(props) {
  const [isInputActive, setIsInputActive] = useState(false);
  const [inputValue, setInputValue] = useState(props.text);

  const wrapperRef = useRef(null);
  const textRef = useRef(null);
  const inputRef = useRef(null);

  const enter = useKeypress("Enter");
  const esc = useKeypress("Escape");

  // check to see if the user clicked outside of this component
  useOnClickOutside(wrapperRef, () => {
    if (isInputActive) {
      props.onSetText(inputValue);
      setIsInputActive(false);
    }
  });

  // focus the cursor in the input field on edit start
  useEffect(() => {
    if (isInputActive) {
      inputRef.current.focus();
    }
  }, [isInputActive]);

  useEffect(() => {
    if (isInputActive) {
      // if Enter is pressed, save the text and case the editor
      if (enter) {
        props.onSetText(inputValue);
        setIsInputActive(false);
      }
      // if Escape is pressed, revert the text and close the editor
      if (esc) {
        setInputValue(props.text);
        setIsInputActive(false);
      }
    }
  }, [enter, esc]); // watch the Enter and Escape key presses

  return (
    <span ref={wrapperRef}>
      <InlineEditText
        ref={textRef}
        isHidden={isInputActive}
        onClick={() => setIsInputActive(true)}
      >
        {props.text}
      </InlineEditText>

      <InlineEditInput
        ref={inputRef}
        // set the width to the input length multiplied by the x height
        // it's not quite right but gets it close
        style={{ minWidth: Math.ceil(inputValue.length) + "ch" }}
        value={inputValue}
        isActive={isInputActive}
        onChange={e => {
          // sanitize the input a little
          setInputValue(DOMPurify.sanitize(e.target.value));
        }}
      />
    </span>
  );
}

export default InlineEdit;
