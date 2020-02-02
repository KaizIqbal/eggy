import { UpdateEgg, PleaseSignIn } from "../../../components";

// ##### PAGE #####
const UpdateEggPage = ({ query }) => (
  <div>
    <PleaseSignIn>
      <h1>Update Egg Form</h1>
      <UpdateEgg id={query.id} />
    </PleaseSignIn>
  </div>
);

export default UpdateEggPage;
