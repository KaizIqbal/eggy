import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import * as React from "react";
import { useForm } from "react-hook-form";
import { Form } from "./CreateEgg.styles";
import Router from "next/router";

// Mutation for createEgg
const CREATE_EGG_MUTATION = gql`
  mutation createEgg($title: String!) {
    createEgg(title: $title) {
      id
    }
  }
`;

// CreateEgg Component

interface ICreateEggProps {}

const CreateEgg: React.FunctionComponent<ICreateEggProps> = props => {
  // createEgg Mutation hook
  const [createEgg, { loading, error }] = useMutation(CREATE_EGG_MUTATION, {
    onCompleted: data => {
      // console.log(data);
      Router.push({
        pathname: "/update",
        query: { id: data.createEgg.id }
      });
    }
  });

  // react form hook
  const { register, handleSubmit, errors } = useForm();

  // Handle On Form Submit
  const onSubmit = async (values, e) => {
    e.preventDefault();
    // console.log(values);
    // createEgg Mutation call with data
    await createEgg({ variables: { ...values } });
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
