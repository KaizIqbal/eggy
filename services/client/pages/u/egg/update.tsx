import { UpdateEgg, PleaseLogIn } from "../../../components";

// ##### PAGE #####
const UpdateEggPage = ({ query }) => (
  <div>
    <PleaseLogIn>
      <h1>Update Egg Form</h1>
      <UpdateEgg id={query.id} />
    </PleaseLogIn>
  </div>
);

export default UpdateEggPage;
