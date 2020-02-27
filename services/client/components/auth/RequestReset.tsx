import { useMutation } from "@apollo/react-hooks";
import React from "react";
import { useForm } from "react-hook-form";
import { REQUEST_RESET_MUTATION } from "../../graphql/Mutation";
import { Form } from "../styled";

// ################################################ COMPONENT ###############################################

const RequestReset = () => {
  // ################################################ HOOKS ################################################

  // requestReset Mutation hook
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

  // ################################################ HANDLING FUNCTION ################################################

  // ################ Form submition #################
  // #                                               #
  // #     1. call mutation                          #
  // #     2. reset form                             #
  // #     3. handle error                           #
  // #                                               #
  // #################################################

  const onSubmit = async (values, e) => {
    try {
      e.preventDefault();

      await requestReset({ variables: { ...values } });

      e.target.reset();
    } catch (error) {
      // Reset Form
      e.target.reset();
      console.error(error);
    }
  };

  // ################################################ RENDER #####################################################

  // ####################### Render flow ########################
  // #                                                          #
  // #     (error) => handle the Graphql error                  #
  // #     No errros & mutation called => Success Message       #
  // #     else => Render Component                             #
  // #                                                          #
  // ############################################################

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
            ref={register({ required: true })}
          />
          {errors.email && "Email is required"}
        </label>

        <br />

        {/* Submition */}
        <button type="submit">RequestReset</button>
      </fieldset>
    </Form>
  );
};

export default RequestReset;
