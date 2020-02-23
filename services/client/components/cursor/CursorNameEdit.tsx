import React, { useState } from "react";
import InlineEdit from "../layout/InlineEdit";
import { useMutation } from "@apollo/react-hooks";
import { CURSORS_QUERY } from "../../graphql/Query";
import { RENAME_CURSOR_MUTATION } from "../../graphql/Mutation";

// ##### COMPONENT PROPS TYPE #####
interface ICursorEditProps {
  name: string;
  id: string;
  flavorId: string;
}

// ##### COMPONENT #####
const CursorEdit: React.FunctionComponent<ICursorEditProps> = props => {
  console.log(props);
  // ##### INLINE EDIT HOOKS #####
  // set cursor name default in inline Component
  const [cursorName, setCursorName] = useState(props.name);
  // call Mutation for create Cursor
  const [renameCursor, { loading, error }] = useMutation(
    RENAME_CURSOR_MUTATION,
    {
      refetchQueries: [
        {
          query: CURSORS_QUERY
        }
      ]
    }
  );

  // <empty string> and Charates only valid in regex
  const regex = /^[A-Za-z]*$/;

  // ##### HANDLING FUNCTION #####
  const _handleRename = async text => {
    // set to the state
    setCursorName(text);
    // if it change so update
    if (cursorName !== props.name) {
      console.log("sending...");
      await renameCursor({
        variables: { id: props.id, flavorId: props.flavorId, name: cursorName }
      });
    }
  };

  // ##### RENDER #####
  return (
    <>
      <InlineEdit
        text={cursorName}
        emptyText={cursorName}
        regex={regex}
        onSetText={_handleRename}
        maxLength={12}
      />
      {loading ? " Saving ..." : null}
      {error ? `${error}` : null}
    </>
  );
};

export default CursorEdit;
