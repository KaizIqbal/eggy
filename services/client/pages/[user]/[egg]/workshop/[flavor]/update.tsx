import { UpdateFlavor, EggOwner } from "../../../../../components";
import { useRouter } from "next/router";

// ##### PAGE #####
const UpdateEggPage = () => {
  const router = useRouter();

  return (
    <div>
      <EggOwner username={router.query.user} eggname={router.query.egg}>
        <h1>Update Flavor Form</h1>
        <UpdateFlavor
          username={router.query.user}
          eggname={router.query.egg}
          name={router.query.flavor}
        />
      </EggOwner>
    </div>
  );
};

export default UpdateEggPage;
