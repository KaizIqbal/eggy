import React from "react";
import Router from "next/router";

// Graphql Query & Mutation
import { RESET_PASSWORD_MUTATION } from "../../graphql/Mutation";
import { ME_QUERY } from "../../graphql/Query";

// Hooks libraries
import { useMutation } from "@apollo/react-hooks";
import { useForm } from "react-hook-form";

// styled components
import { Form } from "../styled";

// Contains all routes
import paths from "../../paths";

// ################################################ COMPONENT'S TYPE ###############################################

interface IProps {
  token: string;
}

type FormData = {
  password: string;
  confirmPassword: string;
};

// ################################################ COMPONENT ################################################
const Reset: React.FunctionComponent<IProps> = props => {
  // ################################################ HOOKS ################################################

  // resetPassword Mutation hook
  const [resetPassword, { loading, error }] = useMutation(
    RESET_PASSWORD_MUTATION,
    {
      refetchQueries: [
        {
          query: ME_QUERY
        }
      ],
      onCompleted: () => {
        // Redirect to the Basket Page
        Router.push(paths.basket);
      }
    }
  );

  // react form hook
  const { register, handleSubmit, watch, errors } = useForm<FormData>();
  // ################################################ HANDLING FUNCTION ################################################

  // ################ Form submition #################
  // #                                               #
  // #     1. call mutation                          #
  // #     2. reset form                             #
  // #     3. push Router                            #
  // #     4. handle error                           #
  // #                                               #
  // #################################################

  const onSubmit = async (values, e) => {
    try {
      e.preventDefault();
      await resetPassword({
        variables: {
          resetToken: props.token,
          ...values
        }
      });

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
        {/* Insert password  */}
        <label htmlFor="password">
          Password
          <input
            type="password"
            id="password"
            name="password"
            placeholder="password"
            minLength={8}
            ref={register({
              required: "Password is required"
            })}
          />
          {errors.password && errors.password.message}
        </label>

        <br />

        {/* Insert confirmPassword  */}
        <label htmlFor="password">
          Confirm Password
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="confirmPassword"
            minLength={8}
            ref={register({
              required: "Confirm Password is Required",
              validate: value =>
                value === watch("password") || "Passwords don't match."
            })}
          />
          {errors.confirmPassword && errors.confirmPassword.message}
        </label>

        <br />

        {/* Submition */}
        <button type="submit">Reset Password</button>
      </fieldset>
    </Form>
  );
};

export default Reset;
