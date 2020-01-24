import { CreateEgg, PleaseLogIn } from "../../components";
import useUser from "../../hooks/user";

// ##### PAGE #####
const AddEggPage = ({ query }) => {
  // ##### HOOKS #####

  const { me, loading, error } = useUser();

  // ##### RENDER #####

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! ${error.message}</p>;
  console.log(me);
  if (!me) {
    return <p>Please Login</p>;
  }

  if (me) {
    return (
      <div>
        <PleaseLogIn>
          <h1>Create Egg Form</h1>
          <CreateEgg />
        </PleaseLogIn>
      </div>
    );
  }
};

export default AddEggPage;
