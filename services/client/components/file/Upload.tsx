import { useMutation } from "@apollo/react-hooks";
import React from "react";
import { UPLOAD_MUTATION } from "../../graphql/Mutation";
import { Form } from "../styled";
import { useForm } from "react-hook-form";
import { CURSOR_QUERY } from "../../graphql/Query";

// ##### COMPONENT PROPS TYPE #####

interface IFileUploadProps {
  cursorId: string;
  eggname: string;
  flavorname: string;
  cursorname: string;
}

// ##### COMPONENT #####

const FileUpload: React.FunctionComponent<IFileUploadProps> = props => {
  // ##### HOOKS #####

  const [fileUpload, { error, loading }] = useMutation(UPLOAD_MUTATION, {
    refetchQueries: [
      {
        query: CURSOR_QUERY,
        variables: {
          eggname: props.eggname,
          flavorname: props.flavorname,
          cursorname: props.cursorname
        }
      }
    ]
  });

  // react form hook
  const { register, handleSubmit, errors } = useForm();

  // ##### HANDLING FUNCTION #####

  // Handle On Form Submit
  const onSubmit = async (
    values: Record<string, any>,
    e: { preventDefault: () => void; target: { reset: { (): void; (): void } } }
  ) => {
    try {
      e.preventDefault();

      // get only one file from values
      const file = values.file[0];

      // uploadFile Mutation
      await fileUpload({ variables: { file: file, cursorId: props.cursorId } });

      // Reset Form
      e.target.reset();
    } catch (error) {
      // Reset Form
      e.target.reset();
      console.error(error);
    }
  };

  // ##### RENDER #####
  if (loading) return <p>Fetching cursor......</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} encType={"multipart/form-data"}>
        <fieldset disabled={loading}>
          {/* Insert eggname for Routing */}
          <label htmlFor="file">
            Import File
            <input
              type="file"
              accept="image/*"
              id="file"
              name="file"
              ref={register({ required: true })}
            />
            {errors.file && "File Is Required"}
          </label>

          <br />
          {/* Submition */}
          <button type="submit">Submit</button>
        </fieldset>
      </Form>
    </>
  );
};

export default FileUpload;
