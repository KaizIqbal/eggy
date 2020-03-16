import React, { useState } from "react";

// Graphql Query & Mutation
import { CREATE_EGG_MUTATION } from "../../graphql/Mutation";
import { PUBLIC_BASKET_QUERY, USER_BASKET_QUERY } from "../../graphql/Query";

// Hooks libraries
import { useMutation } from "@apollo/react-hooks";
import { useForm } from "react-hook-form";

// Helper Constraint
import { possiblePlatforms } from "../../graphql/constraint";

// Components
import { Popup } from "../index";

// Styled Components
import { Form, Button } from "../styled";

// ################################################ COMPONENT'S TYPE ####################################

interface IProps {}

type FormData = {
  eggname: string;
  title: string;
  platforms: string;
};

// ################################################ COMPONENT ###############################################
const CreateEgg: React.FunctionComponent<IProps> = _props => {
  // ################################################ HOOKS ################################################

  // For storing Popup State
  const [popup, setPopup] = useState(false);

  // createEgg Mutation hook
  const [createEgg, { loading, error }] = useMutation(CREATE_EGG_MUTATION, {
    refetchQueries: [
      {
        query: PUBLIC_BASKET_QUERY
      },
      {
        query: USER_BASKET_QUERY
      }
    ]
  });

  // react form hook
  const { register, handleSubmit, errors } = useForm<FormData>();

  // ################################################ HANDLING FUNCTION ################################################

  // ################ Form submition #################
  // #                                               #
  // #     1. call mutation                          #
  // #     2. reset form                             #
  // #     3. close popup                            #
  // #     4. handle error                           #
  // #                                               #
  // #################################################

  // Handle On Form Submit
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

  // ################ Popup toggle ###################
  // #                                               #
  // #     For Toggling Popup state                  #
  // #                                               #
  // #################################################

  const togglePopup = () => {
    setPopup(!popup);
  };

  // ################################################ RENDER #####################################################

  // ####################### Render flow ########################
  // #                                                          #
  // #     (error) => handle the Graphql error                  #
  // #     else => Render Form inside Popup Component by using  #
  // #             local state                                  #
  // #                                                          #
  // ############################################################

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
                {possiblePlatforms.map(platform => (
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

export default CreateEgg;
