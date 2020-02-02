import { useRouter } from "next/router";
import { EggDetail } from "../../../components";

// ##### PAGE #####
const Egg = () => {
  const router = useRouter();
  console.log(router.query);
  return <p>Egg</p>;
  // <EggDetail id={query.id} />;
};

export default Egg;
