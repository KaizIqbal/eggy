import React from "react";
import Link from "next/link";

import { useCursorsQuery, Cursor } from "generated/graphql";
import { setCursors } from "helper/constriants";

import { DeleteCursor } from "components/cursor";

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
      <>
        {data!.cursors!.map((c: any) => {
          const cursor: Cursor = c;
          return (
            <li key={cursor.id}>
              <Link
                href={{ pathname: "/workshop/[slug]", query: { flavorId: cursor.flavor.id, cursorId: cursor.id } }}
                as={`/workshop/${cursor.flavor.egg.eggname}`}
                shallow={true}>
                <a>{cursor.name}</a>
              </Link>
              <DeleteCursor id={cursor.id} flavorId={cursor.flavor.id} />
            </li>
          );
        })}
      </>
    );
  }

  return body;
};
