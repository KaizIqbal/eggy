import React, { useState } from "react";
import InlineEdit from "../layout/InlineEdit";

// ##### COMPONENT PROPS TYPE #####
interface ICursorEditProps {
  name: string;
}

// ##### COMPONENT #####
const CursorEdit: React.FunctionComponent<ICursorEditProps> = props => {
  // ##### INLINE EDIT HOOKS #####
  // set cursor name default in inline Component
  const [cursorName, setCursorName] = useState(props.name);
  // ##### RENDER #####
  return (
    <>
      <InlineEdit text={cursorName} onSetText={text => setCursorName(text)} />
    </>
  );
};

export default CursorEdit;
