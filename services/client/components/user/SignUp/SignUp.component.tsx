import { useMutation } from "@apollo/react-hooks";
import React from "react";
import { useForm } from "react-hook-form";
import { SIGNUP_MUTATION } from "../../../graphql/Mutation";
import { Form } from "../styles";
import { ME_QUERY } from "../../../graphql/Query";

// ##### COMPONENT PROPS TYPE #####
interface ISignUpProps {}

// ##### COMPONENT #####
const SignUp: React.FunctionComponent<ISignUpProps> = props => {
  // ##### HOOKS #####

  // signUp Mutation hook
  const [signUp, { loading, error }] = useMutation(SIGNUP_MUTATION, {
    refetchQueries: [
      {
        query: ME_QUERY
      }
    ],
    onCompleted: ({ signup }) => {
      try {
        // console.log(signup);
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
      await signUp({ variables: { ...values } });
      // Reset Form
      e.target.reset();
    } catch (error) {
      // Reset Form
      e.target.reset();
      console.error(error);
    }
  };

  // ##### RENDER #####

  // if any error in form submiting
  if (error) return <p>Error: {error.message}</p>;

  // else render form
  return (
    <Form onSubmit={handleSubmit(onSubmit)} method="post">
      <fieldset disabled={loading}>
        {/* Insert username  */}
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            placeholder="name"
            ref={register({ required: true })}
          />
          {errors.title && "Username is required"}
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
        <button type="submit">SignUp</button>
      </fieldset>
    </Form>
  );
};

export default SignUp;
