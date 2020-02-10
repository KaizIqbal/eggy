import { useRouter } from "next/router";
import { FlavorWorkshop, EggOwner } from "../../../../../components";

// ##### PAGE #####
const FlavorPage = () => {
  const router = useRouter();
  return (
    <EggOwner username={router.query.user} eggname={router.query.egg}>
      <FlavorWorkshop
        username={router.query.user}
        eggname={router.query.egg}
        flavorname={router.query.flavor}
      />
    </EggOwner>
  );
};

export default FlavorPage;
