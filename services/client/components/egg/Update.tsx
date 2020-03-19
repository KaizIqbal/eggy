import React, { useState } from "react";

import { UserBasketDocument, PublicBasketDocument, useUpdateEggMutation, Egg } from "generated/graphql";
import { useForm } from "react-hook-form";

import { possiblePlatforms } from "helper/constriants";

import { Popup } from "components/Popup";
import { RenameEgg } from "components/egg";
import { Button, Form } from "components/styled";

interface IProps {
  egg: Egg;
}

type FormData = {
  platforms: string;
};

export const UpdateEgg: React.FC<IProps> = ({ egg }) => {
  // ---------------------------------------------------------------- HOOKS

  const [popup, setPopup] = useState(false);
  const [updateEgg, { loading, error }] = useUpdateEggMutation({
    refetchQueries: [{ query: UserBasketDocument }, { query: PublicBasketDocument }]
  });
  const { register, handleSubmit, errors } = useForm<FormData>();

  // ---------------------------------------------------------------- HANDLING FUNCTION

  const onSubmit = async (values: any, e: any) => {
    try {
      e.preventDefault();

      await updateEgg({ variables: { id: egg.id, ...values } });

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

  const currentPlatforms = Object.values(egg.platforms);

  // ---------------------------------------------------------------- RENDER

  if (error) return <p>Error: {error.message}</p>;
  return (
    <>
      <Button onClick={togglePopup}>Edit</Button>
      {popup ? (
        <Popup closePopup={togglePopup}>
          <br />
          <RenameEgg egg={egg} />
          <Form onSubmit={handleSubmit(onSubmit)}>
            <fieldset disabled={loading}>
              <label htmlFor="platforms">
                {possiblePlatforms.map(platform => (
                  <label key={platform} htmlFor={`platform-${platform}`}>
                    <input
                      id={`platform-${platform}`}
                      type="checkbox"
                      value={platform}
                      defaultChecked={currentPlatforms.includes(platform)}
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
              <button type="submit">Updat{loading ? "ing" : "e"}</button>
            </fieldset>
          </Form>
        </Popup>
      ) : null}
    </>
  );
};
