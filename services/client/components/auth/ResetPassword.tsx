import React from "react";

import { useForm } from "react-hook-form";
import { useResetPasswordMutation, MeDocument, MeQuery } from "generated/graphql";

import { Form } from "components/styled";
import { setAccessToken } from "lib/accessToken";
import Router from "next/router";

interface IProps {
  token: any;
}

type FormData = {
  password: string;
  confirmPassword: string;
};

export const ResetPassword: React.FC<IProps> = ({ token }) => {
  // ---------------------------------------------------------------- HOOKS

  const [resetPassword, { loading, error }] = useResetPasswordMutation();
  const { register, handleSubmit, watch, errors } = useForm<FormData>();

  // ---------------------------------------------------------------- HANDLING FUNCTION

  const onSubmit = async (values: any, e: any) => {
    try {
      e.preventDefault();

      const response = await resetPassword({
        variables: {
          resetToken: token,
          ...values
        },
        update: (store, { data }) => {
          if (!data) {
            return null;
          }

          store.writeQuery<MeQuery>({
            query: MeDocument,
            data: {
              me: data.resetPassword.user
            }
          });
        }
      });

      if (response && response.data) {
        setAccessToken(response.data.resetPassword.accessToken);
      }

      Router.push("/dashboard");
    } catch (error) {
      e.target.reset();
    }
  };

  // ---------------------------------------------------------------- RENDER

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
              validate: value => value === watch("password") || "Passwords don't match."
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
