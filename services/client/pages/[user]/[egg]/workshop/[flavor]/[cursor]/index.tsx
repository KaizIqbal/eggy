import { useRouter } from "next/router";
import { EggOwner, Workshop } from "../../../../../../components";

// ##### PAGE #####
const CursorWorkshop = () => {
  const router = useRouter();
  return (
    <EggOwner username={router.query.user} eggname={router.query.egg}>
      <Workshop cursorname={router.query.cursor} />
    </EggOwner>
  );
};

export default CursorWorkshop;
