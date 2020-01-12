import { useQuery } from "@apollo/react-hooks";
import Link from "next/link";
import Router from "next/router";
import React from "react";
import { EGGS_QUERY } from "../../graphql/Query";
import DeleteEgg from "../DeleteEgg/DeleteEgg.component";
import { Button, List, ListEgg } from "./EggList.styles";
import { perPage } from "../../config";

// ##### COMPONENT PROPS TYPE #####
interface IEggListProps {
  page: number;
}

// ##### COMPONENT #####
const EggList: React.FunctionComponent<IEggListProps> = props => {
  // ##### HOOKS #####

  // the hook that calls the query.
  const { loading, error, data } = useQuery(EGGS_QUERY, {
    variables: { skip: props.page * perPage - perPage }
  });

  // ##### RENDER #####

  // Fetching Eggs Details
  if (loading) return <p>Loading...</p>;

  // if any error in fetching Data
  if (error) return <p>Error: {error.message}</p>;

  // if Data is not existed
  if (!data.eggs) return <p>No Egg Found</p>;

  // create List of each egg
  const listEgg = data.eggs.map(egg => {
    return (
      <ListEgg key={egg.id}>
        {/* Name of Egg with Link of Detail Page*/}
        <Link prefetch href={{ pathname: "/egg", query: { id: egg.id } }}>
          <a>{egg.title}</a>
        </Link>

        {/*  Edit Button*/}
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

        {/* Delete Button */}
        <DeleteEgg id={egg.id}>Delete</DeleteEgg>
      </ListEgg>
    );
  });

  return (
    <>
      {/* Actual Egg List */}
      <List>{listEgg}</List>
    </>
  );
};

export default EggList;
