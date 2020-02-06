import React from "react";
import useFlavours from "../../hooks/flavours";
import Link from "next/link";

// ##### COMPONENT PROPS TYPE #####
interface IFlavoursProps {
  username: string;
  eggname: string;
  eggId: string;
}

// ##### COMPONENT #####
const Flavours: React.FunctionComponent<IFlavoursProps> = props => {
  // ##### HOOKS #####

  //fetching all Flavours in Egg
  const { data, loading } = useFlavours({ eggId: props.eggId });

  if (loading) return <p>Loading Flavours..........</p>;
  // ##### RENDER #####
  return (
    <div>
      {data.map(flavour => (
        <li key={flavour.id}>
          <Link
            href="/[user]/[egg]/workshop/[flavour]"
            as={`/${props.username}/${props.eggname}/workshop/${flavour.name}`}
          >
            <a>{flavour.name}</a>
          </Link>
        </li>
      ))}
    </div>
  );
};

export default Flavours;
