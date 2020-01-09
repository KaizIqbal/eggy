import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import * as React from "react";
import { useForm } from "react-hook-form";
import { Form } from "./UpdateEgg.styles";

// Mutation for UpdateEgg
const UPDATE_EGG_MUTATION = gql`
  mutation updateEgg($id: ID!, $title: String!) {
    updateEgg(id: $id, title: $title) {
      id
    }
  }
`;

// Query For fetch Egg by id
const EGG_QUERY = gql`
  query egg($id: ID!) {
    egg(where: { id: $id }) {
      id
      title
    }
  }
`;

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
  const [UpdateEgg, { loading, error }] = useMutation(UPDATE_EGG_MUTATION, {
    onCompleted: data => {
      console.log(data);
    }
  });

  // react form hook
  const { register, handleSubmit, errors } = useForm();

  // Handle On Form Submit
  const onSubmit = async (values, e) => {
    e.preventDefault();
    // console.log(values);
    // UpdateEgg Mutation call with data
    await UpdateEgg({ variables: { id: props.id, ...values } });
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
