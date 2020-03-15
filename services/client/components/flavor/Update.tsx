import { useMutation, useQuery } from "@apollo/react-hooks";
// import Router from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { UPDATE_FLAVOR_MUTATION } from "../../graphql/Mutation";
import { FLAVORS_QUERY, FLAVOR_QUERY } from "../../graphql/Query";
import { Form } from "../styled";

// ##### COMPONENT PROPS TYPE #####
interface IUpdateFlavorProps {
  username: any;
  eggname: any;
  name: any;
}

// ##### COMPONENT #####
const UpdateFlavor: React.FunctionComponent<IUpdateFlavorProps> = props => {
  // ##### HOOKS #####

  // Fetch data by id using Query Hook
  const { loading: fetching, error: fetchingError, data: fetchData } = useQuery(
    FLAVOR_QUERY,
    {
      variables: { name: props.name }
    }
  );

  // Mutation hooks for updating flavor
  const [UpdateFlavor, { loading, error }] = useMutation(
    UPDATE_FLAVOR_MUTATION,
    {
      refetchQueries: [
        {
          query: FLAVORS_QUERY,
          variables: {
            eggname: props.eggname
          }
        }
      ],
      onCompleted: () => {
        // Router.push(
        //   "/[username]/[egg]/workshop",
        //   `/${props.username}/${props.eggname}/workshop`
        // );
      }
    }
  );

  // react form hook
  const { register, handleSubmit, errors } = useForm();

  // ##### HANDLE FUNCTION #####

  // Handle On Form Submit
  const onSubmit = async (values: any, e: any) => {
    try {
      e.preventDefault();

      // UpdateFlavor Mutation call with data
      await UpdateFlavor({ variables: { id: fetchData.flavor.id, ...values } });
    } catch (error) {
      // Reset Form
      e.target.reset();
      console.error(error);
    }
  };

  // ##### RENDER #####

  // Fetching Egg Details
  if (fetching) return <p>Fetching Flavor........</p>;

  // if any error in fetching Data
  if (fetchingError) return <p>Error: {fetchingError.message}</p>;

  // if Data is not existed
  if (!fetchData.flavor) return <p>No Flavor Found</p>;

  // if any error in form submiting
  if (error) return <p>Error: {error.message}</p>;

  //else render form
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <fieldset disabled={loading}>
        {/* Insert Title of Egg */}
        <label htmlFor="Flavor Name">
          Name
          <input
            defaultValue={fetchData.flavor.name}
            type="text"
            id="name"
            name="name"
            pattern="[a-zA-Z]+"
            placeholder="Round"
            ref={register({ required: true })}
          />
          {errors.name && "Flavor Name is required "}
        </label>

        <br />

        {/* Submition */}
        <button type="submit">Updat{loading ? "ing" : "e"}</button>
      </fieldset>
    </Form>
  );
};

export default UpdateFlavor;
