import { useMutation } from "@apollo/react-hooks";
import React from "react";
import { useForm } from "react-hook-form";
import { CREATE_EGG_MUTATION } from "../../../graphql/Mutation";
import { GET_EGGS_CURSOR, GET_USER_EGGS_CURSOR } from "../../../graphql/Query";
import { Form } from "./CreateEgg.styles";
import { possibleCursorTypes } from "../../../graphql/constraint";
import Router from "next/router";

// ##### COMPONENT PROPS TYPE #####
interface ICreateEggProps {}

// ##### COMPONENT #####
const CreateEgg: React.FunctionComponent<ICreateEggProps> = props => {
  // ##### HOOKS #####

  // createEgg Mutation hook
  const [createEgg, { loading, error }] = useMutation(CREATE_EGG_MUTATION, {
    refetchQueries: [
      {
        query: GET_EGGS_CURSOR
      },
      {
        query: GET_USER_EGGS_CURSOR
      }
    ],
    onCompleted: () => {
      Router.back();
    }
  });

  // react form hook
  const { register, handleSubmit, errors } = useForm();

  // ##### HANDLING FUNCTION #####

  // Handle On Form Submit
  const onSubmit = async (values, e) => {
    try {
      e.preventDefault();
      // createEgg Mutation call with data
      await createEgg({ variables: { ...values } });

      // Reset Form
      e.target.reset();
    } catch (error) {
      // Reset Form
      e.target.reset();
      console.error(error);
    }
  };

  // ##### RENDER #####

  // if any error in form submiting
  if (error) return <p>Error: {error.message}</p>;

  // else render form
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <fieldset disabled={loading}>
        {/* Insert eggname for Routing */}
        <label htmlFor="eggname">
          Egg
          <input
            type="eggname"
            id="eggname"
            name="eggname"
            placeholder="Sweet"
            ref={register({ required: true })}
          />
          {errors.title && "Your input is required"}
        </label>

        <br />

        {/* Insert Title of Egg */}
        <label htmlFor="title">
          Title
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Sweet Cursor"
            ref={register({ required: true })}
          />
          {errors.title && "Your input is required"}
        </label>

        <br />

        {possibleCursorTypes.map(cursorType => (
          <label key={cursorType} htmlFor={`cursorType-${cursorType}`}>
            <input
              id={`cursorType-${cursorType}`}
              type="checkbox"
              value={cursorType}
              name="cursorTypes"
              ref={register({ required: true })}
            />
            {cursorType}
          </label>
        ))}
        <br />
        {/* Submition */}
        <button type="submit">Submit</button>
      </fieldset>
    </Form>
  );
};

export default CreateEgg;
