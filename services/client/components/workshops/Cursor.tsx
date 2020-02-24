import { useQuery } from "@apollo/react-hooks";
import React from "react";
import { CURSOR_QUERY } from "../../graphql/Query";
import DeleteFile from "../file/Delete";
import FileUpload from "../file/Upload";

// ##### COMPONENT PROPS TYPE #####

interface ICursorWorkshopProps {
  username: any;
  eggname: any;
  flavorname: any;
  cursorname: any;
}

// ##### COMPONENT #####

const CursorWorkshop: React.FunctionComponent<ICursorWorkshopProps> = props => {
  // ##### HOOKS #####
  const { data, loading, error } = useQuery(CURSOR_QUERY, {
    variables: {
      ...props
    }
  });

  // ##### RENDER #####
  if (loading) return <p>Fetching cursor......</p>;
  if (!data) return <p>Cursor not found</p>;

  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <p>{data.cursor.frames}</p>

      {/* Display Cursor  */}
      {data.cursor.source && (
        <>
          <img src={data.cursor.source.url} alt={data.cursor.name} />
          <DeleteFile names={{ ...props }} id={data.cursor.source.id} />
        </>
      )}

      {/* If Image urlnot exits render the form */}
      {!data.cursor.source && (
        <FileUpload
          eggname={props.eggname}
          flavorname={props.flavorname}
          cursorname={props.cursorname}
          cursorId={data.cursor.id}
        />
      )}
    </>
  );
};

export default CursorWorkshop;
