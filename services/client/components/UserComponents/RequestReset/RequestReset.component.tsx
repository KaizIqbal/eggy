import { useMutation } from "@apollo/react-hooks";
import React from "react";
import { useForm } from "react-hook-form";
import { REQUEST_RESET_MUTATION } from "../../../graphql/Mutation";
import { Form } from "../styles";

// ##### COMPONENT PROPS TYPE #####
interface IRequestResetProps {}

// ##### COMPONENT #####
const RequestReset: React.FunctionComponent<IRequestResetProps> = props => {
  // ##### HOOKS #####

  // RequestReset Mutation hook
  const [requestReset, { loading, error, called }] = useMutation(
    REQUEST_RESET_MUTATION,
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
      await requestReset({ variables: { ...values } });
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

  // Sucessfully Reset link sended
  if (!error && !loading && called)
    return <p>Reset Link Sended check your email</p>;

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

        {/* Submition */}
        <button type="submit">RequestReset</button>
      </fieldset>
    </Form>
  );
};

export default RequestReset;
