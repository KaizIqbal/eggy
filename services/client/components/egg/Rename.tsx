import React, { useState, useEffect } from "react";
import InlineEdit from "../layout/InlineEdit";
import { useMutation } from "@apollo/react-hooks";
import { GET_EGGS_CURSOR, GET_USER_EGGS_CURSOR } from "../../graphql/Query";
import { RENAME_EGG_MUTATION } from "../../graphql/Mutation";

// ################################################ COMPONENT'S TYPE ####################################

interface IProps {
  title: any;
  id: any;
}

// ##### COMPONENT #####
const RenameEgg: React.FunctionComponent<IProps> = props => {
  // ################################################ HOOKS ################################################

  // local state
  const [title, setTitle] = useState(props.title);

  // call Mutation `renameEgg`
  const [renameEgg, { loading, error }] = useMutation(RENAME_EGG_MUTATION, {
    refetchQueries: [
      {
        query: GET_EGGS_CURSOR
      },
      {
        query: GET_USER_EGGS_CURSOR
      }
    ]
  });

  // ################################################ HELPER HOOKS ################################################

  useEffect(() => {
    // if it's changed call renameEgg mutation
    if (title !== props.title) {
      console.log("sending...");
      renameEgg({
        variables: { id: props.id, title: title }
      });
    }
  }, [title, props, renameEgg]);

  // ################################################ HANDLING FUNCTION ################################################
  const _handleRename = async (text: any) => {
    // set the state
    setTitle(text);
  };

  // ################################################ RENDER ################################################

  return (
    <>
      <InlineEdit
        text={title}
        emptyText={title}
        onSetText={_handleRename}
        maxLength={20}
      />
      {loading ? " Saving ..." : null}
      {error ? `${error}` : null}
    </>
  );
};

export default RenameEgg;
