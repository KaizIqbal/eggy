import React from "react";

import { useForm } from "react-hook-form";
import { useResetPasswordMutation, MeDocument } from "generated/graphql";

import { Form } from "components/styled";
import { setAccessToken } from "lib/accessToken";

interface IProps {
  token: string;
}

type FormData = {
  password: string;
  confirmPassword: string;
};

export const ResetPassword: React.FC<IProps> = ({ token }) => {
  // ---------------------------------------------------------------- HOOKS

  const [resetPassword, { loading, error }] = useResetPasswordMutation({
    refetchQueries: [{ query: MeDocument }],
    onCompleted: ({ resetPassword: { accessToken } }) => {
      setAccessToken(accessToken);
    }
  });
  const { register, handleSubmit, watch, errors } = useForm<FormData>();

  // ---------------------------------------------------------------- HANDLING FUNCTION

  const onSubmit = async (values: any, e: any) => {
    try {
      e.preventDefault();
      await resetPassword({
        variables: {
          resetToken: token,
          ...values
        }
      });
      e.target.reset();
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
