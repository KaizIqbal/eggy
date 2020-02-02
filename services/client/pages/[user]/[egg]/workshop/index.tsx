import { useRouter } from "next/router";
import { Workshop, EggOwner } from "../../../../components";

// ##### PAGE #####
const Egg = () => {
  const router = useRouter();
  return (
    <EggOwner username={router.query.user} eggname={router.query.egg}>
      <Workshop username={router.query.user} eggname={router.query.egg} />
    </EggOwner>
  );
};

export default Egg;
