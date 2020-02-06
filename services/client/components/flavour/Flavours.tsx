import React from "react";
import useFlavours from "../../hooks/flavours";

// ##### COMPONENT PROPS TYPE #####
interface IFlavoursProps {
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
        <li key={flavour.id}>{flavour.name}</li>
      ))}
    </div>
  );
};

export default Flavours;
