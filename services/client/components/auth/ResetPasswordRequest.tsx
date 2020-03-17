import React from "react";

import { useForm } from "react-hook-form";
import { useResetPasswordRequestMutation } from "generated/graphql";

import { Form } from "components/styled";

interface IProps {}

type FormData = {
  email: string;
};

export const ResetPasswordRequest: React.FunctionComponent<IProps> = _props => {
  // ##### HOOKS #####

  const [
    resetPasswordRequest,
    { loading, error, called }
  ] = useResetPasswordRequestMutation();
  const { register, handleSubmit, errors } = useForm<FormData>();

  // ##### HANDLING FUNCTION #####

  const onSubmit = async (values: any, e: any) => {
    try {
      e.preventDefault();
      await resetPasswordRequest({ variables: { ...values } });
      e.target.reset();
    } catch (error) {
      e.target.reset();
    }
  };

  // ##### RENDER #####

  if (error) return <p>Error: {error.message}</p>;

  if (!error && !loading && called)
    return <p>Reset Link Sended check your email</p>;

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

        {/* Submition */}
        <button type="submit">RequestReset</button>
      </fieldset>
    </Form>
  );
};
