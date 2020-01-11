import { UpdateEgg } from "../components";

// ##### PAGE #####
const Update = ({ query }) => (
  <>
    <h1>Update Egg Form</h1>
    <UpdateEgg id={query.id} />
  </>
);

export default Update;
