import React, { useCallback } from "react";

import Dropzone from "react-dropzone";
import { useUploadFileMutation, CursorsDocument } from "generated/graphql";

interface IProps {
  cursorId: string;
  flavorId: string;
}

export const UploadFile: React.FC<IProps> = ({ cursorId, flavorId }) => {
  // ---------------------------------------------------------------- HOOKS
  const [uploadFile, { loading, error }] = useUploadFileMutation({
    refetchQueries: [{ query: CursorsDocument, variables: { flavorId } }]
  });

  // ---------------------------------------------------------------- HANDLING FUNCTION
  const onDrop = useCallback(
    acceptedFiles => {
      const file = acceptedFiles[0];
      uploadFile({ variables: { file, cursorId } });
    },
    [uploadFile, cursorId]
  );

  // ---------------------------------------------------------------- RENDER
  if (error) return <p>Error: {error.message}</p>;
  if (loading) return <p>Uploading...</p>;
  return (
    <>
      <Dropzone onDrop={files => onDrop(files)}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} disabled={loading} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          </section>
        )}
      </Dropzone>
    </>
  );
};
