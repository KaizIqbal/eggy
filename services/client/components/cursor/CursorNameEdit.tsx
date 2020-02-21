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
  const regex = /^[A-Za-z]+$/;

  // ##### RENDER #####
  return (
    <>
      <InlineEdit
        text={cursorName}
        regex={regex}
        onSetText={text =>
          text.length === 0 ? setCursorName(props.name) : setCursorName(text)
        }
        maxLength={12}
      />
    </>
  );
};

export default CursorEdit;
