import React, { useState, useEffect } from "react";
import InlineEdit from "../layout/InlineEdit";
import { useMutation } from "@apollo/react-hooks";
import { PUBLIC_BASKET_QUERY, USER_BASKET_QUERY } from "../../graphql/Query";
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
        query: PUBLIC_BASKET_QUERY
      },
      {
        query: USER_BASKET_QUERY
      }
    ]
  });

  const regex = /^[^\s]+(\s+[^\s]+)*$/;

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
    // Remove unnecessary space from title
    // example "   This is   a  DOG     " =>  "This is a DOG"
    text = text.trim();
    text = text.replace(/  +/g, " ");

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
        regex={regex}
      />
      {loading ? " Saving ..." : null}
      {error ? `${error}` : null}
    </>
  );
};

export default RenameEgg;
