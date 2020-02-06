import { useRouter } from "next/router";
import { FlavorWorkshop, EggOwner } from "../../../../components";

// ##### PAGE #####
const WorkshopPage = () => {
  const router = useRouter();
  return (
    <EggOwner username={router.query.user} eggname={router.query.egg}>
      <FlavorWorkshop username={router.query.user} eggname={router.query.egg} />
    </EggOwner>
  );
};

export default WorkshopPage;
