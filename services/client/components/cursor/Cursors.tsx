import React from "react";
import useCursors from "../../hooks/cursors";
import DeleteCursor from "./Delete";
import Link from "next/link";

// ##### COMPONENT PROPS TYPE #####
interface IFlavorsProps {
  username: string;
  eggname: string;
  flavorname: string;
}

// ##### COMPONENT #####
const Cursors: React.FunctionComponent<IFlavorsProps> = props => {
  // ##### HOOKS #####

  //fetching all Cursors in Flavor
  const { data, loading } = useCursors({ flavorname: props.flavorname });

  if (loading) return <p>Loading Cursors..........</p>;
  // ##### RENDER #####
  return (
    <div>
      {data.map(cursor => (
        <li key={cursor.id}>
          <Link
            href="/[user]/[egg]/workshop/[flavor]/[cursor]"
            as={`/${props.username}/${props.eggname}/workshop/${
              props.flavorname
            }/${cursor.name}`}
          >
            <a>{cursor.name}</a>
          </Link>

          {/* <Button
            type="button"
            onClick={() => {
              Router.push(
                "/[user]/[egg]/workshop/[flavor]/update",
                `/${props.username}/${props.eggname}/workshop/${
                  flavor.name
                }/update`
              );
            }}
          >
            Update
          </Button> */}
          <DeleteCursor id={cursor.id} flavorname={props.flavorname} />
        </li>
      ))}
    </div>
  );
};

export default Cursors;
