import React from "react";
import Router from "next/router";

import { useCursorsQuery, Cursor } from "generated/graphql";
import { setCursors } from "helper/constriants";

import { UploadFile, DeleteFile } from "components/file";
import { DeleteCursor } from "components/cursor";
import { CursorList, CursorCard, Heading, Actions, Body } from "components/styled/cursor/Cursors";

interface IProps {
  flavorId: string;
}

export const Cursors: React.FC<IProps> = ({ flavorId }) => {
  // ---------------------------------------------------------------- HOOKS

  const { data, loading, error } = useCursorsQuery({ variables: { flavorId } });

  let body: any = (
    <>
      <p>
        Click <strong>+ Add Cursor</strong> to Create New One
      </p>
    </>
  );

  // ---------------------------------------------------------------- RENDER

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  // store and filter cursor in the global variable `availableCursors`
  // 👇 👇 This help in create Cursor for check how many cursors left to create
  setCursors(data!.cursors!.map((cursor: any) => cursor.name));

  if (data && data.cursors.length !== 0) {
    body = (
      <CursorList>
        {data!.cursors!.map((c: any) => {
          const cursor: Cursor = c;
          return (
            <CursorCard key={cursor.id}>
              <Heading>
                <label
                  htmlFor={cursor.name}
                  onClick={() =>
                    Router.push(
                      { pathname: "/workshop/[slug]", query: { flavorId: cursor.flavor.id, cursorId: cursor.id } },
                      `/workshop/${cursor.flavor.egg.eggname}`
                    )
                  }>
                  {cursor.name}
                </label>
              </Heading>
              <Body>
                {cursor.source ? (
                  <>
                    <img src={cursor.source.url} alt={cursor.source.filename} />
                    <DeleteFile fileId={cursor.source.id} flavorId={flavorId} />
                  </>
                ) : (
                  <UploadFile flavorId={flavorId} cursorId={cursor.id} />
                )}
              </Body>
              <Actions>
                <DeleteCursor id={cursor.id} flavorId={cursor.flavor.id} />
              </Actions>
            </CursorCard>
          );
        })}
      </CursorList>
    );
  }

  return body;
};
