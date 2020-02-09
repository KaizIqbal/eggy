import { useMutation } from "@apollo/react-hooks";
import React from "react";
import { useForm } from "react-hook-form";
import { possibleCursors } from "../../graphql/constraint";
import { CREATE_CURSOR_MUTATION } from "../../graphql/Mutation";
import useCursors from "../../hooks/cursors";
import { Form } from "../styled";
import { CURSORS_QUERY } from "../../graphql/Query";

// ##### COMPONENT PROPS TYPE #####
interface ICreateCursorProps {
  flavorname: string;
  flavorId: string;
}

// ##### COMPONENT #####
const CreateCursor: React.FunctionComponent<ICreateCursorProps> = props => {
  // ##### HOOKS #####

  // call Mutation for create Cursor
  const [createCursor, { loading, error }] = useMutation(
    CREATE_CURSOR_MUTATION,
    {
      refetchQueries: [
        {
          query: CURSORS_QUERY,
          variables: { flavorname: props.flavorname }
        }
      ]
    }
  );

  //fetch cursors for how much added
  const { data, loading: fetching } = useCursors({
    flavorname: props.flavorname
  });

  // react form hook
  const { register, handleSubmit, errors } = useForm();

  // ##### HANDLING FUNCTION #####

  // Handle On Form Submit
  const onSubmit = async (
    values: Record<string, any>,
    e: { preventDefault: () => void; target: { reset: { (): void; (): void } } }
  ) => {
    try {
      e.preventDefault();

      // Check option available in list or not
      if (!cursors.includes(values.name))
        return window.alert(`Sorry, cursor "${values.name}" not found`);

      // first convert frames to Integer Value
      values.frames = parseInt(values.frames, 10);

      // createCursor Mutation call with data
      await createCursor({
        variables: { ...values, flavorId: props.flavorId }
      });

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
  const fetchedCursors = data.map((cursor: { name: string }) => cursor.name);

  // generate list of remain cursors that not added to egg
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
          {errors.name && "Cursor Type required"}
        </label>

        <br />

        {/* Insert cursor frames */}
        <label htmlFor="Cursor Frames">
          Frames <br />
          <input
            type="number"
            max="60"
            name="frames"
            id="frames"
            ref={register({ required: true })}
          />
          {errors.frames && "Frames is required "}
        </label>

        <br />

        {/* Submition */}
        <button type="submit">Add</button>
      </fieldset>
    </Form>
  );
};

export default CreateCursor;
