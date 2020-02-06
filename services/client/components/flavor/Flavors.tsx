import React from "react";
import useFlavors from "../../hooks/flavors";
import Link from "next/link";

// ##### COMPONENT PROPS TYPE #####
interface IFlavorsProps {
  username: string;
  eggname: string;
  eggId: string;
}

// ##### COMPONENT #####
const Flavors: React.FunctionComponent<IFlavorsProps> = props => {
  // ##### HOOKS #####

  //fetching all Flavours in Egg
  const { data, loading } = useFlavors({ eggId: props.eggId });

  if (loading) return <p>Loading Flavors..........</p>;
  // ##### RENDER #####
  return (
    <div>
      {data.map(flavor => (
        <li key={flavor.id}>
          <Link
            href="/[user]/[egg]/workshop/[flavor]"
            as={`/${props.username}/${props.eggname}/workshop/${flavor.name}`}
          >
            <a>{flavor.name}</a>
          </Link>
        </li>
      ))}
    </div>
  );
};

export default Flavors;
