import { useRouter } from "next/router";
import { Egg } from "../../../components";

// ##### PAGE #####
const EggPage = () => {
  const router = useRouter();
  return <Egg eggname={router.query.egg} />;
};

export default EggPage;
