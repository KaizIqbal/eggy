import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { useCreateCursorMutation, CursorsDocument } from "generated/graphql";

import { getAvailableCursors } from "helper/constriants";
import sanitizeCursorName from "helper/sanitizeCursorName";

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

  // ---------------------------------------------------------------- HELPER

  const availableCurosrs = getAvailableCursors();

  // ---------------------------------------------------------------- HANDLING FUNCTION

  const onSubmit = async (values: any, e: any) => {
    try {
      e.preventDefault();

      // first convert frames to Integer Value
      values.frames = parseInt(values.frames, 10);

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

  let body: any = (
    <>
      <h2>All Cursors is Satisfied</h2>
    </>
  );

  if (availableCurosrs && availableCurosrs.length !== 0) {
    body = (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <fieldset disabled={loading}>
          {/* Select Cursor Name */}
          <label htmlFor="Cursor Name">
            Select Cursor
            <select
              id="name"
              name="name"
              ref={register({ required: "Your input is required" })}
            >
              {availableCurosrs.map((cursor: string) => (
                <option key={cursor} value={cursor}>
                  {sanitizeCursorName(cursor)}
                </option>
              ))}
            </select>
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
              max="60"
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
    );
  }

  return (
    <>
      <Button onClick={togglePopup}>+ Add Cursor</Button>
      {popup ? (
        <Popup closePopup={togglePopup}>
          <br />
          {body}
        </Popup>
      ) : null}
    </>
  );
};
