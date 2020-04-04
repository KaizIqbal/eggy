import React, { useCallback } from "react";

import { useDropzone } from "react-dropzone";
import { useUploadFileMutation, CursorsDocument } from "generated/graphql";

import { Button } from "components/styled";

interface IProps {
  cursorId: string;
  flavorId: string;
}

export const UploadFile: React.FC<IProps> = ({ cursorId, flavorId }) => {
  // ---------------------------------------------------------------- HOOKS

  const [uploadFile, { loading, error }] = useUploadFileMutation({
    refetchQueries: [{ query: CursorsDocument, variables: { flavorId } }]
  });

  const upload = useCallback(
    acceptedFiles => {
      const file = acceptedFiles[0];
      uploadFile({ variables: { file, cursorId } });
    },
    [uploadFile, cursorId]
  );

  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    onDrop: upload,
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
    accept: [".svg"]
  });

  // ---------------------------------------------------------------- HANDLING FUNCTION

  const files = acceptedFiles.map((file: any) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  // ---------------------------------------------------------------- RENDER

  if (error) return <p>Error: {error.message}</p>;

  if (loading) return <p>Uploading...</p>;

  return (
    <>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here</p>
        <Button type="button" onClick={open}>
          Open File Dialog
        </Button>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </>
  );
};
