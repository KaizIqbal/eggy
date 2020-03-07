import React from "react";

// Graphql Query & Mutation
import { REQUEST_RESET_MUTATION } from "../../graphql/Mutation";

// Hooks libraries
import { useMutation } from "@apollo/react-hooks";
import { useForm } from "react-hook-form";

// styled components
import { Form } from "../styled";

// ################################################ COMPONENT'S TYPE ####################################

interface IProps {}

type FormData = {
  email: string;
};

// ################################################ COMPONENT ###############################################
const RequestReset: React.FunctionComponent<IProps> = _props => {
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

export default RequestReset;
