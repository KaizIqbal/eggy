import { CreateEgg } from "../components";

const Egg = ({ query }) => (
  <div>
    <h1>Create Egg Form</h1>
    <p>Id is {query.id}</p>
    <CreateEgg />
  </div>
);

export default Egg;
