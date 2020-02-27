import React from "react";
import Router from "next/router";

// Graphql Query & Mutation
import { ME_QUERY } from "../../graphql/Query";
import { SIGNUP_MUTATION } from "../../graphql/Mutation";

// Hooks libraries
import { useMutation } from "@apollo/react-hooks";
import { useForm } from "react-hook-form";

// styled components
import { Form } from "../styled";

// ################################################ COMPONENT ###############################################

const Signup = () => {
  // ################################################ HOOKS ################################################

  // signup Mutation hook
  const [signup, { loading, error }] = useMutation(SIGNUP_MUTATION, {
    refetchQueries: [
      {
        query: ME_QUERY
      }
    ],
    onCompleted: () => {
      Router.back();
    }
  });

  // react form hook
  const { register, handleSubmit, errors } = useForm();

  // ################################################ HANDLING FUNCTION ################################################

  // ################ Form submition #################
  // #                                               #
  // #     1. call mutation                          #
  // #     2. reset form                             #
  // #     3. handle error                           #
  // #                                               #
  // #################################################

  const onSubmit = async (values, e) => {
    try {
      e.preventDefault();
      // createEgg Mutation call with data
      await signup({ variables: { ...values } });
      // Reset Form
      e.target.reset();
    } catch (error) {
      // Reset Form
      e.target.reset();
      console.error(error);
    }
  };

  // ################################################ RENDER #####################################################

  // ################## Render flow ##################
  // #                                               #
  // #     (error) => handle the Graphql error       #
  // #     else => Render Component                  #
  // #                                               #
  // #################################################

  if (error) return <p>Error: {error.message}</p>;

  return (
    <Form onSubmit={handleSubmit(onSubmit)} method="post">
      <fieldset disabled={loading}>
        {/* Insert name  */}
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            placeholder="name"
            ref={register({ required: true })}
          />
          {errors.name && "Username is required"}
        </label>

        <br />

        {/* Insert username  */}
        <label htmlFor="username">
          Username
          <input
            type="username"
            id="username"
            name="username"
            placeholder="username"
            ref={register({ required: true })}
          />
          {errors.username && "Username is required"}
        </label>

        <br />

        {/* Insert email  */}
        <label htmlFor="email">
          Email
          <input
            type="email"
            id="email"
            name="email"
            placeholder="email"
            ref={register({ required: true })}
          />
          {errors.email && "Email is required"}
        </label>

        <br />

        {/* Insert password  */}
        <label htmlFor="password">
          Password
          <input
            type="password"
            id="password"
            name="password"
            placeholder="password"
            ref={register({ required: true, minLength: 8 })}
          />
          {errors.password && "Password is required"}
        </label>

        <br />

        {/* Submition */}
        <button type="submit">Signup</button>
      </fieldset>
    </Form>
  );
};

export default Signup;
