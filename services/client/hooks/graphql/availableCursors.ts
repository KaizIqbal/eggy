import useCursors from "./cursors";
import { possibleCursors } from "../../graphql/constraint";

interface IArguments {
  flavorname: string;
  filter: boolean;
}

function useAvailableCursors({ flavorname, filter }: IArguments) {
  //fetch cursors for how much added
  const { data, loading: fetching } = useCursors({
    flavorname: flavorname
  });

  let cursors: Array<string>;
  // Fetching all cursors
  if (fetching) return { fetching };

  // get only cursor name in data
  const fetchedCursors = data.map((cursor: { name: any }) => cursor.name);
  if (filter) {
    // generate list of remain cursors that not added to egg
    cursors = possibleCursors.filter(
      cursor => !fetchedCursors.includes(cursor)
    );
  } else {
    cursors = fetchedCursors;
  }

  return {
    fetching,
    availableCursors: cursors
  };
}
export default useAvailableCursors;
