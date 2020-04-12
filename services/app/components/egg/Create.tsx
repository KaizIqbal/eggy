import React, { useState } from "react";

import { useCreateEggMutation, UserBasketDocument, PublicBasketDocument } from "generated/graphql";
import { useForm } from "react-hook-form";

import { Button, Form } from "components/styled";
import { Popup } from "components/Popup";
import { possiblePlatforms } from "helper/constriants";

interface IProps {}

type FormData = {
  eggname: string;
  title: string;
  platforms: string;
};

export const CreateEgg: React.FC<IProps> = _props => {
  // ---------------------------------------------------------------- HOOKS

  const [popup, setPopup] = useState(false);
  const [createEgg, { loading, error }] = useCreateEggMutation({
    refetchQueries: [{ query: UserBasketDocument }, { query: PublicBasketDocument }]
  });
  const { register, handleSubmit, errors } = useForm<FormData>();

  // ---------------------------------------------------------------- HANDLING FUNCTION

  const onSubmit = async (values: any, e: any) => {
    try {
      e.preventDefault();
      await createEgg({ variables: { ...values } });

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
      <Button onClick={togglePopup}>+ Add Egg</Button>
      {popup ? (
        <Popup closePopup={togglePopup}>
          <br />
          <Form onSubmit={handleSubmit(onSubmit)}>
            <fieldset disabled={loading}>
              {/* Insert Title of Egg */}
              <label htmlFor="title">
                Title
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Sweet Cursor"
                  ref={register({ required: "Your input is required" })}
                />
                {errors.title && errors.title.message}
              </label>

              <br />

              <label htmlFor="platforms">
                {possiblePlatforms.map((platform: string) => (
                  <label key={platform} htmlFor={`platform-${platform}`}>
                    <input
                      id={`platform-${platform}`}
                      type="checkbox"
                      value={platform}
                      name="platforms"
                      ref={register({ required: "Your input is required" })}
                    />
                    {platform}
                  </label>
                ))}
                {errors.platforms && errors.platforms.message}
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
