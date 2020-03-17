import React from "react";
import Router from "next/router";

import { useForm } from "react-hook-form";
import { useSignupMutation, MeDocument } from "generated/graphql";

import { Form } from "components/styled";
import { setAccessToken } from "lib/accessToken";

interface IProps {}

type FormData = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
};

export const Signup: React.FunctionComponent<IProps> = _props => {
  // ##### HOOKS #####

  const [signup, { loading, error }] = useSignupMutation({
    refetchQueries: [{ query: MeDocument }],
    onCompleted: ({ signup: { accessToken } }) => {
      setAccessToken(accessToken);
      Router.back();
    }
  });
  const { register, handleSubmit, errors } = useForm<FormData>();

  // ##### HANDLING FUNCTION #####

  const onSubmit = async (values: any, e: any) => {
    try {
      e.preventDefault();
      await signup({ variables: { ...values } });
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
        {/* Insert First Name  */}
        <label htmlFor="firstName">
          First Name
          <input
            type="text"
            id="firstName"
            name="firstName"
            pattern="[A-Za-z]+"
            placeholder="John"
            ref={register({ required: "First Name is required" })}
          />
          {errors.firstName && errors.firstName.message}
        </label>

        <br />

        {/* Insert Last Name  */}
        <label htmlFor="lastName">
          Last Name
          <input
            type="text"
            id="lastName"
            name="lastName"
            pattern="[A-Za-z]+"
            placeholder="Wrick"
            ref={register({ required: "Last Name is required" })}
          />
          {errors.lastName && errors.lastName.message}
        </label>

        <br />

        {/* Insert username  */}
        <label htmlFor="username">
          Username
          <input
            type="username"
            id="username"
            name="username"
            pattern="[A-Za-z0-9_]+"
            placeholder="username"
            ref={register({ required: "Username is required" })}
          />
          {errors.username && errors.username.message}
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
            minLength={8}
            ref={register({
              required: "Password is required"
            })}
          />
          {errors.password && errors.password.message}
        </label>

        <br />

        {/* Submition */}
        <button type="submit">Signup</button>
      </fieldset>
    </Form>
  );
};
