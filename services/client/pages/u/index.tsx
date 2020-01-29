import { PleaseLogIn, UserEggList } from "../../components";
//##### PAGE #####
const Me = () => {
  return (
    <PleaseLogIn>
      <a href="/u/egg/add">+Add Egg</a>
      <UserEggList />
    </PleaseLogIn>
  );
};

export default Me;
