import React from "react";

interface IProps {
  eggId: string;
}

export const RenderFlavors: React.FC<IProps> = ({ eggId }) => {
  // ---------------------------------------------------------------- HOOKS

  // const { data, loading, error } = useRenderFlavorsQuery({ variables: { eggId } });

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
              <p>{flavor.name}</p>
            </li>
          );
        })}
      </>
    );
  }

  return body;
};
