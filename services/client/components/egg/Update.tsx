import React, { useState } from "react";

// Graphql Query & Mutation
import { UPDATE_EGG_MUTATION } from "../../graphql/Mutation";
import { GET_EGGS_CURSOR, GET_USER_EGGS_CURSOR } from "../../graphql/Query";

// Hooks libraries
import { useMutation } from "@apollo/react-hooks";
import { useForm } from "react-hook-form";

// Components
import { Popup } from "../index";

// Styled Components
import { Form, Button } from "../styled";

// ################################################ COMPONENT'S TYPE ####################################

interface IProps {
  egg: any;
}

type FormData = {
  title: string;
};

// ################################################ COMPONENT ###############################################
const UpdateEgg: React.FunctionComponent<IProps> = props => {
  // ################################################ HOOKS ################################################

  // For storing Popup State
  const [popup, setPopup] = useState(false);

  // updateEgg Mutation hook
  const [UpdateEgg, { loading, error }] = useMutation(UPDATE_EGG_MUTATION, {
    refetchQueries: [
      {
        query: GET_EGGS_CURSOR
      },
      {
        query: GET_USER_EGGS_CURSOR
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

      await UpdateEgg({ variables: { eggname: props.egg.eggname, ...values } });

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
      <Button onClick={togglePopup}>Edit</Button>
      {popup ? (
        <Popup closePopup={togglePopup}>
          <br />
          <Form onSubmit={handleSubmit(onSubmit)}>
            <fieldset disabled={loading}>
              {/* Edit Title of Egg */}
              <label htmlFor="title">
                Title
                <input
                  defaultValue={props.egg.title}
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Title"
                  ref={register({ required: "Your input is required" })}
                />
                {errors.title && errors.title.message}
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

export default UpdateEgg;
