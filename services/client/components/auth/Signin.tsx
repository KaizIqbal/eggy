import React from "react";
import Router from "next/router";

import { useForm } from "react-hook-form";
import { useSigninMutation, MeDocument } from "generated/graphql";

import { Form } from "components/styled";
import { setAccessToken } from "lib/accessToken";

interface IProps {}

type FormData = {
  email: string;
  password: string;
};

export const Signin: React.FunctionComponent<IProps> = _props => {
  // ##### HOOKS #####

  const [signin, { loading, error }] = useSigninMutation({
    refetchQueries: [{ query: MeDocument }],
    onCompleted: ({ signin: { accessToken } }) => {
      setAccessToken(accessToken);
      Router.back();
    }
  });
  const { register, handleSubmit, errors } = useForm<FormData>();

  // ##### HANDLING FUNCTION #####

  const onSubmit = async (values: any, e: any) => {
    try {
      e.preventDefault();
      await signin({ variables: { ...values } });
      e.target.reset();
    } catch (error) {
      e.target.reset();
    }
  };

  // ##### RENDER #####

  if (error) return <p>Error: {error.message}</p>;

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
