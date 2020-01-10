import { useMutation, useQuery } from "@apollo/react-hooks";
import Router from "next/router";
import * as React from "react";
import { useForm } from "react-hook-form";
import { UPDATE_EGG_MUTATION } from "../../graphql/Mutation";
import { EGG_QUERY } from "../../graphql/Query";
import { Form } from "./UpdateEgg.styles";

// UpdateEgg Component
interface IUpdateEggProps {
  id: any;
}

const UpdateEgg: React.FunctionComponent<IUpdateEggProps> = props => {
  // Fetch data by id using Query Hook
  const { loading: fetching, error: fetchingError, data: fetchData } = useQuery(
    EGG_QUERY,
    {
      variables: { id: props.id }
    }
  );

  // UpdateEgg Mutation hook
  const [UpdateEgg, { loading, error }] = useMutation(UPDATE_EGG_MUTATION);

  // react form hook
  const { register, handleSubmit, errors } = useForm();

  // Handle On Form Submit
  const onSubmit = async (values, e) => {
    try {
      e.preventDefault();
      // console.log(values);
      // UpdateEgg Mutation call with data
      await UpdateEgg({ variables: { id: props.id, ...values } });

      // Push to the Eggs page
      Router.push({
        pathname: "/eggs"
      });
    } catch (error) {
      // Reset Form
      e.target.reset();
      console.error(error);
    }
  };

  // rendering part
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
        <button type="submit">Updat{loading ? "ing" : "e"}</button>
      </fieldset>
    </Form>
  );
};

export default UpdateEgg;
