import { UpdateEgg } from "../../components";

// ##### PAGE #####
const UpdateEggPage = ({ query }) => (
  <div>
    <h1>Update Egg Form</h1>
    <UpdateEgg id={query.id} />
  </div>
);

export default UpdateEggPage;
