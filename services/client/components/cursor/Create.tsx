import { useMutation } from "@apollo/react-hooks";
import React from "react";
import { useForm } from "react-hook-form";
import { possibleCursors } from "../../graphql/constraint";
import { CREATE_CURSOR_MUTATION } from "../../graphql/Mutation";
import { Form } from "../styled";
import useCursors from "../../hooks/cursors";

// ##### COMPONENT PROPS TYPE #####
interface ICreateEggProps {
  eggId: string;
  eggname: string;
}

// ##### COMPONENT #####
const CreateCursor: React.FunctionComponent<ICreateEggProps> = props => {
  // ##### HOOKS #####

  // createEgg Mutation hook
  const [createCursor, { loading, error }] = useMutation(
    CREATE_CURSOR_MUTATION
  );

  //fetch cursors for how much added
  const { data, loading: fetching } = useCursors({ eggname: props.eggname });

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
  if (fetching) return <p>Fetching Egg</p>;

  // get only cursor name in data
  const fetchedCursors = data.map(cursor => cursor.name);

  // generate list of remain cursors that not added
  const cursors = possibleCursors.filter(
    cursor => !fetchedCursors.includes(cursor)
  );

  // No cursor for add is possible
  if (cursors.length === 0) {
    return <p>All Cursosrs satisfeid</p>;
  }

  // Render form
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <fieldset disabled={loading}>
        {/* Insert cursor name */}
        <label htmlFor="Cursor Name">
          Select Cursor <br />
          <select name="name" id="name" ref={register({ required: true })}>
            {cursors.map(cursor => (
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
