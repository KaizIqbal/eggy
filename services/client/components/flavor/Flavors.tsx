import React from "react";

import { useFlavorsQuery, Flavor } from "generated/graphql";

import Link from "next/link";

interface IProps {
  eggId: string;
}

export const Flavors: React.FC<IProps> = ({ eggId }) => {
  // ---------------------------------------------------------------- HOOKS

  const { data, loading, error } = useFlavorsQuery({ variables: { eggId } });

  // ---------------------------------------------------------------- RENDER
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      {data!.flavors!.map((f: any) => {
        const flavor: Flavor = f;
        return (
          <li key={flavor.id}>
            <Link href="/workshop/[...slugs]" as={`/workshop/${flavor.egg.eggname}/${flavor.name}`}>
              <a>{flavor.name}</a>
            </Link>

            {/* <UpdateEgg egg={egg} /> */}
            {/* <DeleteEgg id={egg.id} /> */}
          </li>
        );
      })}
    </>
  );
};
