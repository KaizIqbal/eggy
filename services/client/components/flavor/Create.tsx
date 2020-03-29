import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { useCreateFlavorMutation, FlavorsDocument } from "generated/graphql";

import { Button, Form } from "components/styled";
import { Popup } from "components/Popup";

interface IProps {
  eggId: string;
}

type FormData = {
  name: string;
};

export const CreateFlavor: React.FC<IProps> = ({ eggId }) => {
  // ---------------------------------------------------------------- HOOKS

  const [popup, setPopup] = useState(false);
  const [createFlavor, { loading, error }] = useCreateFlavorMutation({
    refetchQueries: [{ query: FlavorsDocument, variables: { eggId } }]
  });
  const { register, handleSubmit, errors } = useForm<FormData>();

  // ---------------------------------------------------------------- HANDLING FUNCTION

  const onSubmit = async (values: any, e: any) => {
    try {
      e.preventDefault();
      await createFlavor({ variables: { eggId, ...values } });

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
      <Button onClick={togglePopup}>+ Add Flavor</Button>
      {popup ? (
        <Popup closePopup={togglePopup}>
          <br />
          <Form onSubmit={handleSubmit(onSubmit)}>
            <fieldset disabled={loading}>
              {/* Insert Name of Flavor */}
              <label htmlFor="name">
                Name
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Round"
                  ref={register({ required: "Your input is required" })}
                />
                {errors.name && errors.name.message}
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
