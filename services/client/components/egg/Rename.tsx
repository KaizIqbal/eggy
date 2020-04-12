import React, { useState, useEffect } from "react";

import { UserBasketDocument, PublicBasketDocument, Egg, useRenameEggMutation } from "generated/graphql";

import { InlineEdit } from "components/InlineEdit";

interface IProps {
  egg: Egg;
}

export const RenameEgg: React.FC<IProps> = ({ egg }) => {
  // ---------------------------------------------------------------- HOOKS

  const [title, setTitle] = useState(egg.title);
  const [renameEgg, { loading, error }] = useRenameEggMutation({
    refetchQueries: [{ query: UserBasketDocument }, { query: PublicBasketDocument }]
  });
  const regex = /[^\s]*[^\s]/;

  // ---------------------------------------------------------------- HELPER HOOKS

  useEffect(() => {
    // if it's changed call renameEgg mutation
    if (title !== egg.title) {
      // TODO : Remove in prod
      console.log("sending...");
      renameEgg({
        variables: { id: egg.id, title: title }
      });
    }
  }, [title, egg, renameEgg]);

  // ---------------------------------------------------------------- HANDLING FUNCTION

  const _handleRename = async (text: any) => {
    // Remove unnecessary space from title
    // example "   This is   a  DOG     " =>  "This is a DOG"

    text = text.trim();
    text = text.replace(/  +/g, " ");

    // set the state
    setTitle(text);
  };

  // ---------------------------------------------------------------- RENDER

  return (
    <>
      <h1>
        <InlineEdit text={title} emptyText={title} onSetText={_handleRename} maxLength={20} regex={regex} />
      </h1>
      {loading ? <p> Saving ...</p> : null}
      {error ? <p> ${error}</p> : null}
    </>
  );
};
