import { useMutation } from "@apollo/react-hooks";
import React from "react";
import { useForm } from "react-hook-form";
import { LOGIN_MUTATION } from "../../../graphql/Mutation";
import { ME_QUERY } from "../../../graphql/Query";
import { Form } from "../styles";

// ##### COMPONENT PROPS TYPE #####
interface ILogInProps {}

// ##### COMPONENT #####
const LogIn: React.FunctionComponent<ILogInProps> = props => {
  // ##### HOOKS #####

  // logIn Mutation hook
  const [logIn, { loading, error }] = useMutation(LOGIN_MUTATION, {
    refetchQueries: [
      {
        query: ME_QUERY
      }
    ],
    onCompleted: ({ login }) => {
      try {
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
      await logIn({ variables: { ...values } });
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
        <button type="submit">LogIn</button>
      </fieldset>
    </Form>
  );
};

export default LogIn;
