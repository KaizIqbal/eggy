import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import * as React from "react";
import styled from "styled-components";

//Styled Stuff
const Form = styled.form``;

//Mutation for createEgg
const CREATE_EGG_MUTATION = gql`
  mutation createEgg($title: String!) {
    createEgg(title: $title) {
      id
    }
  }
`;

//CreateEgg Component

interface ICreateEggProps {}

const CreateEgg: React.FunctionComponent<ICreateEggProps> = props => {
  let title;
  const [createEgg, { loading, error, data }] = useMutation(
    CREATE_EGG_MUTATION,
    // {
    //   onCompleted() {
    //     console.log(data);
    //   }
    // }
  );

  if (error) return <p>Error: {error.message}</p>;
  return (
    <Form
      onSubmit={async e => {
        e.preventDefault();
        // createEgg Mutation call with state
        await createEgg({ variables: { title: title.value } });
        // title.value = "";
      }}
    >
      <fieldset disabled={loading}>
        <label htmlFor="title">
          Title
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            required
            ref={node => {
              title = node;
            }}
          />
        </label>
        <button type="submit">Submit</button>
      </fieldset>
    </Form>
  );
};

export default CreateEgg;
