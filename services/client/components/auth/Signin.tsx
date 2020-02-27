import React from "react";
import Router from "next/router";

// Graphql Query & Mutation
import { ME_QUERY } from "../../graphql/Query";
import { SIGNIN_MUTATION } from "../../graphql/Mutation";

// Custom Hooks
import useUser from "../../hooks/graphql/user";

// Hooks libraries
import { useMutation } from "@apollo/react-hooks";
import { useForm } from "react-hook-form";

// styled components
import { Form } from "../styled";

// ################################################ COMPONENT PROPS TYPE ####################################

interface ISigninProps {}

// ################################################ COMPONENT ###############################################

const Signin: React.FunctionComponent<ISigninProps> = props => {
  // ################################################ HOOKS ################################################

  // check user already signin or not
  const { me } = useUser();

  // signin Mutation hook
  const [signin, { loading, error }] = useMutation(SIGNIN_MUTATION, {
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

      await signin({ variables: { ...values } });

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
  // #     (me) => User already Signin               #
  // #     (error) => handle the Graphql error       #
  // #     else => Render Component                  #
  // #                                               #
  // #################################################

  if (me) Router.push({ pathname: "/" });

  if (error) return <p>Error: {error.message}</p>;

  // Signin Component
  return (
    <Form onSubmit={handleSubmit(onSubmit)} method="post">
      <fieldset disabled={loading}>
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
            ref={register({ required: true })}
          />
          {errors.password && "Password is required"}
        </label>
        <br />

        {/* Submition */}
        <button type="submit">Signin</button>
      </fieldset>
    </Form>
  );
};

export default Signin;
