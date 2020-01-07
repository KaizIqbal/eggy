import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import * as React from "react";
import { useForm } from "react-hook-form";
import { Form } from "./UpdateEgg.styles";

//Mutation for UpdateEgg
const UPDATE_EGG_MUTATION = gql`
  mutation UpdateEgg($title: String!) {
    UpdateEgg(title: $title) {
      id
    }
  }
`;

//UpdateEgg Component

interface IUpdateEggProps {
  id: any;
}

const UpdateEgg: React.FunctionComponent<IUpdateEggProps> = props => {
  //UpdateEgg Mutation hook
  const [UpdateEgg, { loading, error }] = useMutation(UPDATE_EGG_MUTATION);

  // react form hook
  const { register, handleSubmit, errors } = useForm();

  //Handle On Form Submit
  const onSubmit = async (values, e) => {
    e.preventDefault();
    // console.log(values);
    // UpdateEgg Mutation call with data
    await UpdateEgg({ variables: { title: values.title } });
  };

  //rendering part
  // if any error in form submiting
  if (error) return <p>Error: {error.message}</p>;

  //else render form
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

export default UpdateEgg;
