import { useMutation } from "@apollo/react-hooks";
import * as React from "react";
import { useForm } from "react-hook-form";
import { CREATE_EGG_MUTATION } from "../../graphql/Mutation";
import { Form } from "./CreateEgg.styles";
import Router from "next/router";

// CreateEgg Component
interface ICreateEggProps {}

const CreateEgg: React.FunctionComponent<ICreateEggProps> = props => {
  // createEgg Mutation hook
  const [createEgg, { loading, error }] = useMutation(CREATE_EGG_MUTATION, {
    onCompleted: ({ createEgg }) => {
      try {
        // Push to the Eggs page
        // console.log(data);
        Router.push({
          pathname: "/egg",
          query: { id: createEgg.id }
        });
      } catch (error) {
        console.error(error);
      }
    }
  });

  // react form hook
  const { register, handleSubmit, errors } = useForm();

  // Handle On Form Submit
  const onSubmit = async (values, e) => {
    try {
      e.preventDefault();
      // console.log(values);
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

  // rendering part
  // if any error in form submiting
  if (error) return <p>Error: {error.message}</p>;

  // else render form
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <fieldset disabled={loading}>
        <label htmlFor="title">
          Title
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            ref={register({ required: true })}
          />
          {errors.title && "Your input is required"}
        </label>
        <br />
        <button type="submit">Submit</button>
      </fieldset>
    </Form>
  );
};

export default CreateEgg;
