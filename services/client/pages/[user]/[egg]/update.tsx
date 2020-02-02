import { UpdateEgg, PleaseSignIn, EggOwner } from "../../../components";
import { useRouter } from "next/router";

// ##### PAGE #####
const UpdateEggPage = () => {
  const router = useRouter();

  return (
    <div>
      <PleaseSignIn>
        <EggOwner username={router.query.user} eggname={router.query.egg}>
          <h1>Update Egg Form</h1>
          <UpdateEgg eggname={router.query.egg} />
        </EggOwner>
      </PleaseSignIn>
    </div>
  );
};

export default UpdateEggPage;
