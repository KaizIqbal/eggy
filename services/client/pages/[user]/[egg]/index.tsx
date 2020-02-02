import { useRouter } from "next/router";
import { EggDetail } from "../../../components";

// ##### PAGE #####
const Egg = () => {
  const router = useRouter();
  return <EggDetail eggname={router.query.egg} />;
};

export default Egg;
