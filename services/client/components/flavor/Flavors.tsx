import React from "react";
import Link from "next/link";

import { useFlavorsQuery, Flavor } from "generated/graphql";

import { RenameFlavor, DeleteFlavor } from "components/flavor";

interface IProps {
  eggId: string;
}

export const Flavors: React.FC<IProps> = ({ eggId }) => {
  // ---------------------------------------------------------------- HOOKS

  const { data, loading, error } = useFlavorsQuery({ variables: { eggId } });

  let body: any = (
    <>
      <p>
        Click <strong>+ Add Flavor</strong> to Create New One
      </p>
    </>
  );

  // ---------------------------------------------------------------- RENDER

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  if (data!.flavors!.length !== 0) {
    body = (
      <>
        {data!.flavors!.map((f: any) => {
          const flavor: Flavor = f;
          return (
            <li key={flavor.id}>
              <Link
                href={{ pathname: "/workshop/[slug]", query: { flavorId: flavor.id } }}
                as={`/workshop/${flavor.egg.eggname}`}
                shallow={true}>
                <a>{flavor.name}</a>
              </Link>
              <RenameFlavor eggId={eggId} flavor={flavor} />
              <DeleteFlavor eggId={eggId} id={flavor.id} />
            </li>
          );
        })}
      </>
    );
  }

  return body;
};
