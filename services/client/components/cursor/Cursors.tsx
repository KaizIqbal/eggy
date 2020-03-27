import React from "react";
import Link from "next/link";

import { useCursorsQuery, Cursor } from "generated/graphql";

interface IProps {
  flavorId: string;
}

export const Flavors: React.FC<IProps> = ({ flavorId }) => {
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

  if (data!.cursors!.length !== 0) {
    body = (
      <>
        {data!.cursors!.map((c: any) => {
          const cursor: Cursor = c;
          return (
            <li key={cursor.id}>
              <Link
                href="/workshop/[...slugs]"
                as={`/workshop/${cursor.flavor.egg.eggname}/${cursor.flavor.id}/${cursor.id}`}>
                <a>{cursor.name}</a>
              </Link>
            </li>
          );
        })}
      </>
    );
  }

  return body;
};
