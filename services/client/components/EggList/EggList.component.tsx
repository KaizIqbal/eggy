import { useQuery } from "@apollo/react-hooks";
import Link from "next/link";
import Router from "next/router";
import React from "react";
import { EGGS_QUERY } from "../../graphql/Query";
import DeleteEgg from "../DeleteEgg/DeleteEgg.component";
import { Button, List, ListEgg } from "./EggList.styles";

// this interface defines the shape of the data returned by the eggs query.
export interface Iegg {
  id: string;
  title: string;
}

// DeleteEgg Component
interface IEggListProps {}

const EggList: React.FunctionComponent<IEggListProps> = props => {
  // the hook that calls the query.
  const { loading, error, data } = useQuery(EGGS_QUERY);

  // rendering part
  // Fetching Egg Details
  if (loading) return <p>Loading...</p>;
  // if any error in fetching Data
  if (error) return <p>Error: {error.message}</p>;
  // if Data is not existed
  if (!data.eggs) return <p>No Egg Found</p>;

  const listEgg = data.eggs.map(egg => {
    return (
      <ListEgg key={egg.id}>
        <Link href={{ pathname: "/egg", query: { id: egg.id } }}>
          <a>{egg.title}</a>
        </Link>
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
