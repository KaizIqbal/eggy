import { useRouter } from "next/router";
import { EggOwner, CursorWorkshop } from "../../../../../../components";

// ##### PAGE #####
const CursorWorkshopPage = () => {
  const router = useRouter();
  return (
    <EggOwner username={router.query.user} eggname={router.query.egg}>
      <CursorWorkshop
        username={router.query.user}
        eggname={router.query.egg}
        flavorname={router.query.flavor}
        cursorname={router.query.cursor}
      />
    </EggOwner>
  );
};

export default CursorWorkshopPage;
