import { useMutation, useQuery } from "@apollo/react-hooks";
import React from "react";
import { useForm } from "react-hook-form";
import { CREATE_FLAVOR_MUTATION } from "../../graphql/Mutation";
import { Form } from "../styled";
import { EGG_QUERY, FLAVORS_QUERY } from "../../graphql/Query";

// ##### COMPONENT PROPS TYPE #####
interface ICreateFlavorProps {
  eggname: string;
}

// ##### COMPONENT #####
const CreateFlavor: React.FunctionComponent<ICreateFlavorProps> = props => {
  // ##### HOOKS #####

  const { data, loading: fetching, error: fetchingError } = useQuery(
    EGG_QUERY,
    {
      variables: {
        eggname: props.eggname
      }
    }
  );

  // Mutation hooks for creating Flavour
  const [createFlavor, { loading, error }] = useMutation(
    CREATE_FLAVOR_MUTATION,
    {
      refetchQueries: [
        { query: FLAVORS_QUERY, variables: { eggId: data.egg.id } }
      ]
    }
  );

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

      // createCursor Mutation call with data
      await createFlavor({ variables: { ...values, eggId: data.egg.id } });

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
  if (fetchingError) return <p>{fetchingError.message}</p>;
  if (fetching || loading) return <p>Fetching Egg......</p>;

  // Render form
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <fieldset disabled={loading}>
        {/* Insert cursor frames */}
        <label htmlFor="Flavor Name">
          Flavor Name
          <input
            type="text"
            name="name"
            id="name"
            pattern="[a-zA-Z]+"
            placeholder="Round"
            ref={register({ required: true })}
          />
          {errors.name && "Flavor Name is required "}
        </label>

        <br />

        {/* Submition */}
        <button type="submit">Add</button>
      </fieldset>
    </Form>
  );
};

export default CreateFlavor;
