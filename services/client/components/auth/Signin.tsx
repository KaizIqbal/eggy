import React from "react";
import Router from "next/router";

// Graphql Query & Mutation
import { ME_QUERY } from "../../graphql/Query";
import { SIGNIN_MUTATION } from "../../graphql/Mutation";

// Hooks libraries
import { useMutation } from "@apollo/react-hooks";
import { useForm } from "react-hook-form";

// styled components
import { Form } from "../styled";

// Contains all routes
import paths from "../../paths";

// ################################################ COMPONENT'S TYPE ####################################

interface IProps {}

type FormData = {
  email: string;
  password: string;
};

// ################################################ COMPONENT ###############################################
const Signin: React.FunctionComponent<IProps> = props => {
  // ################################################ HOOKS ################################################

  // signin Mutation hook
  const [signin, { loading, error }] = useMutation(SIGNIN_MUTATION, {
    refetchQueries: [
      {
        query: ME_QUERY
      }
    ],
    onCompleted: ({ data }) => {
      Router.push(paths.dashboard);
    }
  });

  // react form hook
  const { register, handleSubmit, errors } = useForm<FormData>();

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
            ref={register({ required: "Email is required" })}
          />
          {errors.email && errors.email.message}
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
            ref={register({ required: "Password is required" })}
          />
          {errors.password && errors.password.message}
        </label>
        <br />

        {/* Submition */}
        <button type="submit">Signin</button>
      </fieldset>
    </Form>
  );
};

export default Signin;
