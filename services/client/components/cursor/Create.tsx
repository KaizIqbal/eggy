import React, { useState } from "react";

import { useForm } from "react-hook-form";

import { useCreateCursorMutation, CursorsDocument } from "generated/graphql";

import { Button, Form } from "components/styled";
import { Popup } from "components/Popup";

interface IProps {
  flavorId: string;
}

type FormData = {
  name: string;
  frames: number;
};

export const CreateCursor: React.FC<IProps> = ({ flavorId }) => {
  // ---------------------------------------------------------------- HOOKS

  const [popup, setPopup] = useState(false);
  const [createCursor, { loading, error }] = useCreateCursorMutation({
    refetchQueries: [{ query: CursorsDocument, variables: { flavorId } }]
  });
  const { register, handleSubmit, errors } = useForm<FormData>();

  // ---------------------------------------------------------------- HANDLING FUNCTION

  const onSubmit = async (values: any, e: any) => {
    try {
      e.preventDefault();
      await createCursor({ variables: { flavorId, ...values } });

      e.target.reset();

      setPopup(false);
    } catch (error) {
      // Reset Form
      e.target.reset();
      console.error(error);
    }
  };

  const togglePopup = () => {
    setPopup(!popup);
  };

  // ---------------------------------------------------------------- RENDER

  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <Button onClick={togglePopup}>+ Add Cursor</Button>
      {popup ? (
        <Popup closePopup={togglePopup}>
          <br />
          <Form onSubmit={handleSubmit(onSubmit)}>
            <fieldset disabled={loading}>
              {/* Select Cursor Name */}
              <label htmlFor="Cursor Name">
                Select Cursor
                <select id="name" name="name" ref={register({ required: "Your input is required" })} />
                {errors.name && errors.name.message}
              </label>
              <br />

              {/* Insert Frames of Cursor */}
              <label htmlFor="frames">
                Frames
                <input
                  type="number"
                  id="frames"
                  name="frames"
                  defaultValue={1}
                  ref={register({ required: "Your input is required" })}
                />
                {errors.frames && errors.frames.message}
              </label>
              <br />

              {/* Submition */}
              <button type="submit">Submit</button>
            </fieldset>
          </Form>
        </Popup>
      ) : null}
    </>
  );
};
