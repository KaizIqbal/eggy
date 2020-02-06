import { useRouter } from "next/router";
import { CursorWorkshop, EggOwner } from "../../../../components";

// ##### PAGE #####
const FlavourPage = () => {
  const router = useRouter();
  return (
    <EggOwner username={router.query.user} eggname={router.query.egg}>
      <CursorWorkshop
        username={router.query.user}
        eggname={router.query.egg}
        flavourname={router.query.flavour}
      />
    </EggOwner>
  );
};

export default FlavourPage;
