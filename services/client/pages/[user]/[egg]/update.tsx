import { UpdateEgg, PleaseSignIn, Owner } from "../../../components";
import { useRouter } from "next/router";

// ##### PAGE #####
const UpdateEggPage = () => {
  const router = useRouter();

  return (
    <div>
      <PleaseSignIn>
        <Owner username={router.query.user}>
          <h1>Update Egg Form</h1>
          <UpdateEgg eggname={router.query.egg} />
        </Owner>
      </PleaseSignIn>
    </div>
  );
};

export default UpdateEggPage;
