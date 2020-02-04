import { useMutation } from "@apollo/react-hooks";
import React from "react";
import { useForm } from "react-hook-form";
import { CREATE_CURSOR_MUTATION } from "../../graphql/Mutation";
import { possibleCursors } from "../../graphql/constraint";
import { Form } from "../styled";

// ##### COMPONENT PROPS TYPE #####
interface ICreateEggProps {
  eggId: string;
}

// ##### COMPONENT #####
const CreateCursor: React.FunctionComponent<ICreateEggProps> = props => {
  // ##### HOOKS #####

  // createEgg Mutation hook
  const [createCursor, { loading, error }] = useMutation(
    CREATE_CURSOR_MUTATION
  );

  // react form hook
  const { register, handleSubmit, errors } = useForm();

  // ##### HANDLING FUNCTION #####

  // Handle On Form Submit
  const onSubmit = async (values, e) => {
    try {
      e.preventDefault();
      // createEgg Mutation call with data
      await createCursor({ variables: { ...values, eggId: props.eggId } });

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
        {/* Insert cursor name */}
        <label htmlFor="Cursor Name">
          Select Cursor <br />
          <select name="name" id="name" ref={register({ required: true })}>
            {possibleCursors.map(cursor => (
              <option key={cursor} value={cursor}>
                {cursor}
              </option>
            ))}
          </select>
          {errors.title && "Your input is required"}
        </label>

        <br />

        {/* Submition */}
        <button type="submit">Add</button>
      </fieldset>
    </Form>
  );
};

export default CreateCursor;
