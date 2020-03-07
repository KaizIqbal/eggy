import DOMPurify from "dompurify";
import React, { useEffect, useRef, useState } from "react";
import useKeypress from "../../../hooks/layout/inlineEdit/useKeypressed";
import useOnClickOutside from "../../../hooks/layout/inlineEdit/useOnClickOutside";
import { InlineEditInput, InlineEditText } from "./styles";

// ##### COMPONENT PROPS TYPE #####
interface InlineEditProps {
  text: string;
  onSetText: (text: string) => void;

  readonly emptyText: string;
  readonly maxLength: number;
  readonly regex: RegExp;
}

// ##### COMPONENT #####
const InlineEdit: React.FunctionComponent<InlineEditProps> = props => {
  const [isInputActive, setIsInputActive] = useState(false);
  const [inputValue, setInputValue] = useState(props.text);

  const wrapperRef = useRef(null);
  const textRef = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const enter = useKeypress("Enter");
  const esc = useKeypress("Escape");

  // check to see if the user clicked outside of this component
  useOnClickOutside(wrapperRef, () => {
    if (isInputActive) {
      props.onSetText(inputValue);
      setIsInputActive(false);

      // if input is empty
      if (inputValue.length === 0) {
        setInputValue(props.emptyText);
        props.onSetText(props.emptyText);
      }
    }
  });

  // focus the cursor in the input field on edit start
  useEffect(() => {
    if (isInputActive) {
      inputRef.current!.focus();
    }
  }, [isInputActive]);

  useEffect(() => {
    if (isInputActive) {
      // if Enter is pressed, save the text and case the editor
      if (enter) {
        props.onSetText(inputValue);
        setIsInputActive(false);

        // if input is empty
        if (inputValue.length === 0) {
          setInputValue(props.emptyText);
          props.onSetText(props.emptyText);
        }
      }
      // if Escape is pressed, revert the text and close the editor
      if (esc) {
        setInputValue(props.text);
        setIsInputActive(false);
      }
    }
  }, [enter, esc]); // watch the Enter and Escape key presses

  return (
    <>
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
          size={inputValue.length}
          value={inputValue}
          isActive={isInputActive}
          maxLength={props.maxLength}
          placeholder={props.emptyText}
          onChange={e => {
            const value = e.target.value;

            if (value.match(props.regex)) {
              // sanitize the input a little
              setInputValue(DOMPurify.sanitize(value));
            }
          }}
        />
      </span>
    </>
  );
};

export default InlineEdit;
