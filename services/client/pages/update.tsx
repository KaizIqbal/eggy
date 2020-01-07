import { UpdateEgg } from "../components";

const Update = ({ query }) => (
  <div>
    <h1>Create Egg Form</h1>
    <UpdateEgg id={query.id} />
  </div>
);

export default Update;
