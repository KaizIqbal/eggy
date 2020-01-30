import { PleaseLogIn, UserEggList } from "../../components";
import Link from "next/link";
//##### PAGE #####
const Me = () => {
  return (
    <PleaseLogIn>
      <Link href="/u/egg/add">
        <a>+Add Egg</a>
      </Link>
      <UserEggList />
    </PleaseLogIn>
  );
};

export default Me;
