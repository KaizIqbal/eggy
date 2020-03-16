import React from "react";
import Router from "next/router";

// Graphql Query & Mutation
import { SIGNUP_MUTATION } from "../../graphql/Mutation";

// Hooks libraries
import { useMutation } from "@apollo/react-hooks";
import { useForm } from "react-hook-form";

// styled components
import { Form } from "../styled";
import { ME_QUERY } from "graphql/Query";

// ################################################ COMPONENT'S TYPE ####################################

interface IProps {}

type FormData = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
};

// ################################################ COMPONENT ###############################################
const Signup: React.FunctionComponent<IProps> = _props => {
  // ################################################ HOOKS ################################################

  // signup Mutation hook

  const [signup, { loading, error }] = useMutation(SIGNUP_MUTATION, {
    refetchQueries: [{ query: ME_QUERY }],
    onCompleted: () => {
      Router.push("/");
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

  const onSubmit = async (values: any, e: any) => {
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

export default Signup;
