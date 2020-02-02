import { useRouter } from "next/router";
import { EggDetail } from "../../../components";

// ##### PAGE #####
const Egg = () => {
  const router = useRouter();
  console.log(router.query);
  return <EggDetail eggname={router.query.egg} />;
};

export default Egg;
