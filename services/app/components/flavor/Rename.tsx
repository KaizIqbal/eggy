import React, { useState, useEffect } from "react";

import { Flavor, useRenameFlavorMutation, FlavorsDocument } from "generated/graphql";

import { InlineEdit } from "components/InlineEdit";
import { Button } from "components/styled";
import { Popup } from "components/Popup";

interface IProps {
  flavor: Flavor;
  eggId: string;
}

export const RenameFlavor: React.FC<IProps> = ({ flavor, eggId }) => {
  // ---------------------------------------------------------------- HOOKS

  const [popup, setPopup] = useState(false);
  const [name, setName] = useState(flavor.name);
  const [renameFlavor, { loading, error }] = useRenameFlavorMutation({
    refetchQueries: [{ query: FlavorsDocument, variables: { eggId } }]
  });
  const regex = /[^\s][a-zA-Z][^\s]/;

  // ---------------------------------------------------------------- HELPER HOOKS

  useEffect(() => {
    if (name !== flavor.name) {
      // TODO : Remove in prod
      console.log("sending...");
      renameFlavor({
        variables: { id: flavor.id, name: name }
      });
    }
  }, [name, flavor, renameFlavor]);

  // ---------------------------------------------------------------- HANDLING FUNCTION

  const _handleRename = async (text: any) => {
    // Remove unnecessary space from title
    // example "   This is#   a  DOG@     " =>  "This is a DOG"

    text = text.trim();
    text = text.replace(/  +/g, " ");
    text = text.replace(/[^a-zA-Z\s]+/g, "");

    // set the state
    setName(text);
  };
  const togglePopup = () => {
    setPopup(!popup);
  };

  // ---------------------------------------------------------------- RENDER

  return (
    <>
      <Button onClick={togglePopup}>Edit</Button>
      {popup ? (
        <Popup closePopup={togglePopup}>
          <br />
          <h1>
            <InlineEdit text={name} emptyText={name} onSetText={_handleRename} maxLength={20} regex={regex} />
          </h1>
          {loading ? <p> Saving ...</p> : null}
          {error ? <p> ${error}</p> : null}
        </Popup>
      ) : null}
    </>
  );
};
