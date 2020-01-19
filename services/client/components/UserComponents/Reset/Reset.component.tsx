import { useMutation } from "@apollo/react-hooks";
import React from "react";
import { useForm } from "react-hook-form";
import { RESET_PASSWORD_MUTATION } from "../../../graphql/Mutation";
import { Form } from "../styles";

// ##### COMPONENT PROPS TYPE #####
interface IResetProps {
  token: string;
}

// ##### COMPONENT #####
const Reset: React.FunctionComponent<IResetProps> = props => {
  // ##### HOOKS #####

  // RequestReset Mutation hook
  const [resetPassword, { loading, error }] = useMutation(
    RESET_PASSWORD_MUTATION,
    {
      onCompleted: data => {
        try {
          console.log(data);
        } catch (error) {
          console.error(error);
        }
      }
    }
  );

  // react form hook
  const { register, handleSubmit, errors } = useForm();

  // ##### HANDLING FUNCTION #####

  // Handle On Form Submit
  const onSubmit = async (values, e) => {
    try {
      e.preventDefault();
      // createEgg Mutation call with data
      await resetPassword({
        variables: {
          resetToken: props.token,
          password: values.password,
          confirmPassword: values.confirmPassword
        }
      });
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

        {/* Insert password  */}
        <label htmlFor="password">
          Confirm Password
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="confirmPassword"
            ref={register({ required: true })}
          />
          {errors.title && "Password is required"}
        </label>
        <br />
        {/* Submition */}
        <button type="submit">Reset Password</button>
      </fieldset>
    </Form>
  );
};

export default Reset;
