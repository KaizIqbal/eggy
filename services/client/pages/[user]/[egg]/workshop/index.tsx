import { useRouter } from "next/router";
import { FlavourWorkshop, EggOwner } from "../../../../components";

// ##### PAGE #####
const WorkshopPage = () => {
  const router = useRouter();
  return (
    <EggOwner username={router.query.user} eggname={router.query.egg}>
      <FlavourWorkshop
        username={router.query.user}
        eggname={router.query.egg}
      />
    </EggOwner>
  );
};

export default WorkshopPage;
