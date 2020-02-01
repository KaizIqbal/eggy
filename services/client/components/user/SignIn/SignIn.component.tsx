import { useMutation } from "@apollo/react-hooks";
import Router from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { SIGNIN_MUTATION } from "../../../graphql/Mutation";
import { ME_QUERY } from "../../../graphql/Query";
import useUser from "../../../hooks/user";
import { Form } from "../styles";

// ##### COMPONENT PROPS TYPE #####
interface ISignInProps {}

// ##### COMPONENT #####
const SignIn: React.FunctionComponent<ISignInProps> = props => {
  // ##### HOOKS #####
  // for checking user already login or not
  const { me } = useUser();
  // signIn Mutation hook
  const [signIn, { loading, error }] = useMutation(SIGNIN_MUTATION, {
    refetchQueries: [
      {
        query: ME_QUERY
      }
    ],
    onCompleted: () => {
      try {
        Router.push({
          pathname: "/"
        });
        // console.log(login);
      } catch (error) {
        console.error(error);
      }
    }
  });

  // react form hook
  const { register, handleSubmit, errors } = useForm();

  // ##### HANDLING FUNCTION #####

  // Handle On Form Submit
  const onSubmit = async (values, e) => {
    try {
      e.preventDefault();
      // createEgg Mutation call with data
      await signIn({ variables: { ...values } });
      // Reset Form
      e.target.reset();
    } catch (error) {
      // Reset Form
      e.target.reset();
      console.error(error);
    }
  };

  // ##### RENDER #####

  // TODO user already login push to the User Page
  if (me) Router.push({ pathname: "/" });

  // if any error in form submiting
  if (error) return <p>Error: {error.message}</p>;

  // else render form
  return (
    // Else Login Form
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
          {errors.title && "Email is required"}
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
          {errors.title && "Password is required"}
        </label>
        <br />
        {/* Submition */}
        <button type="submit">Signin</button>
      </fieldset>
    </Form>
  );
};

export default SignIn;
