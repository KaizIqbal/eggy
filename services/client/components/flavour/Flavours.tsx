import React from "react";
import { useForm } from "react-hook-form";
import { possibleCursors } from "../../graphql/constraint";
import useFlavours from "../../hooks/flavours";
import { Form } from "../styled";

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
        <li key={flavour.id}>{flavour.title}</li>
      ))}
    </div>
  );
};

export default Flavours;
