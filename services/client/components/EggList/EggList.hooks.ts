import { useQuery } from "@apollo/react-hooks";
import { GET_EGGS_CURSOR } from "../../graphql/Query";

function useEggs() {
  const { data, loading, fetchMore } = useQuery(GET_EGGS_CURSOR, {
    notifyOnNetworkStatusChange: true
  });

  if (loading && !data.eggs) return { loading, eggs: [] };
}
