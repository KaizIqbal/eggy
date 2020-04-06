import React from "react";
import { useRenderFlavorsQuery, Flavor } from "generated/graphql";

interface IProps {
  eggId: string;
}

export const RenderFlavors: React.FC<IProps> = ({ eggId }) => {
  // ---------------------------------------------------------------- HOOKS

  const { data, loading, error } = useRenderFlavorsQuery({ variables: { eggId } });

  // ---------------------------------------------------------------- RENDER

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      {data!.renderFlavors.map((f: any) => {
        const flavor: Flavor = f;
        return (
          <li key={flavor.id}>
            <p>{flavor.name}</p>
          </li>
        );
      })}
    </>
  );
};
