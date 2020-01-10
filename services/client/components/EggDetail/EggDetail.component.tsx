import * as React from "react";

// DeleteEgg Component
interface IDeleteEggProps {
  id: any;
}

const DeleteEgg: React.FunctionComponent<IDeleteEggProps> = props => {
  return <p>This is Egg Detail Page : {props.id}</p>;
};

export default DeleteEgg;
