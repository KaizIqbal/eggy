import { EggDetail } from "../components";
const Egg = ({ query }) => (
  <div>
    <EggDetail id={query.id} />
  </div>
);

export default Egg;
