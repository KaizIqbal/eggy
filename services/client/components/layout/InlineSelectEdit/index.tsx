import DOMPurify from "dompurify";
import React, { useEffect, useRef, useState } from "react";
import useKeypress from "../../../hooks/layout/inlineEdit/useKeypressed";
import useOnClickOutside from "../../../hooks/layout/inlineEdit/useOnClickOutside";
import { InlineEditInput, InlineEditText } from "./styles";

// ##### COMPONENT PROPS TYPE #####
interface InlineSelectEditProps {
  text: string;
  onSetText: (text: string) => void;
  readonly options: any;

  readonly emptyText: any;
  readonly regex: RegExp;
}

// ##### COMPONENT #####
const InlineSelectEdit: React.FunctionComponent<
  InlineSelectEditProps
> = props => {
  const [isInputActive, setIsInputActive] = useState(false);
  const [inputValue, setInputValue] = useState(props.text);

  const wrapperRef = useRef(null);
  const textRef = useRef(null);
  const inputRef = useRef(null);

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
      inputRef.current.focus();
    }
  }, [isInputActive]);

  useEffect(() => {
    if (isInputActive) {
      // if Escape is pressed, revert the text and close the editor
      if (esc) {
        setInputValue(props.text);
        setIsInputActive(false);
      }
    }
  }, [esc]); // watch the Enter and Escape key presses

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
          defaultValue={inputValue}
          isActive={isInputActive}
          placeholder={props.emptyText}
          onChange={e => {
            // sanitize the input a little
            setInputValue(DOMPurify.sanitize(e.target.value));
          }}
        >
          {Object.keys(props.options).map(key => (
            <option key={key} value={key}>
              {props.options[key]}
            </option>
          ))}
        </InlineEditInput>
      </span>
    </>
  );
};

export default InlineSelectEdit;
