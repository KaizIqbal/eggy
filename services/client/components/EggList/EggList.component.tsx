import Router from "next/router";
import React from "react";
import DeleteEgg from "../DeleteEgg/DeleteEgg.component";
import { Button, List, ListEgg } from "./EggList.styles";

// this interface defines the shape of the data returned by the eggs query.
export interface Iegg {
  id: string;
  title: string;
}

interface IProps {
  eggs: Iegg[];
}

const EggList = ({ eggs }: IProps) => {
  const listEgg = eggs.map(egg => {
    return (
      <ListEgg key={egg.id}>
        {egg.title}
        <Button
          type="button"
          name="Edit"
          value="Edit"
          onClick={() => {
            Router.push({
              pathname: "/update",
              query: { id: egg.id }
            });
          }}>
          Edit
        </Button>
        <DeleteEgg id={egg.id}>Delete</DeleteEgg>
      </ListEgg>
    );
  });

  return <List>{listEgg}</List>;
};

export default EggList;
