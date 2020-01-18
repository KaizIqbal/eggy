import { useMutation, useQuery } from "@apollo/react-hooks";
import Router from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { UPDATE_EGG_MUTATION } from "../../../graphql/Mutation";
import { EGG_QUERY, GET_EGGS_CURSOR } from "../../../graphql/Query";
import { Form } from "./UpdateEgg.styles";

// ##### COMPONENT PROPS TYPE #####
interface IUpdateEggProps {
  id: string;
}

// ##### COMPONENT #####
const UpdateEgg: React.FunctionComponent<IUpdateEggProps> = props => {
  // ##### HOOKS #####

  // Fetch data by id using Query Hook
  const { loading: fetching, error: fetchingError, data: fetchData } = useQuery(
    EGG_QUERY,
    {
      variables: { id: props.id }
    }
  );

  // UpdateEgg Mutation hook
  const [UpdateEgg, { loading, error }] = useMutation(UPDATE_EGG_MUTATION, {
    refetchQueries: [
      {
        query: GET_EGGS_CURSOR
      }
    ],
    onCompleted: ({ updateEgg }) => {
      try {
        // Push to the Eggs page
        Router.push({
          pathname: "/egg",
          query: { id: updateEgg.id }
        });
      } catch (error) {
        console.error(error);
      }
    }
  });

  // react form hook
  const { register, handleSubmit, errors } = useForm();

  // ##### HANDLE FUNCTION #####

  // Handle On Form Submit
  const onSubmit = async (values, e) => {
    try {
      e.preventDefault();
      // UpdateEgg Mutation call with data
      await UpdateEgg({ variables: { id: props.id, ...values } });
    } catch (error) {
      // Reset Form
      e.target.reset();
      console.error(error);
    }
  };

  // ##### RENDER #####

  // Fetching Egg Details
  if (fetching) return <p>Loading...</p>;

  // if any error in fetching Data
  if (fetchingError) return <p>Error: {fetchingError.message}</p>;

  // if Data is not existed
  if (!fetchData.egg) return <p>No Egg Found</p>;

  // if any error in form submiting
  if (error) return <p>Error: {error.message}</p>;

  //else render form
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <fieldset disabled={loading}>
        {/* Insert Title of Egg */}
        <label htmlFor="title">
          Title
          <input
            defaultValue={fetchData.egg.title}
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            ref={register({ required: true })}
          />
          {errors.title && "Your input is required"}
        </label>

        <br />

        {/* Submition */}
        <button type="submit">Updat{loading ? "ing" : "e"}</button>
      </fieldset>
    </Form>
  );
};

export default UpdateEgg;
