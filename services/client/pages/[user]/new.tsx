import { CreateEgg, PleaseSignIn } from "../../components";

// ##### PAGE #####
const AddEggPage = () => (
  <div>
    <PleaseSignIn>
      <h1>Create Egg Form</h1>
      <CreateEgg />
    </PleaseSignIn>
  </div>
);

export default AddEggPage;
