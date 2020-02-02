import { PleaseSignIn, UserEggList } from "../../components";
import Link from "next/link";
//##### PAGE #####
const Me = () => {
  return (
    <PleaseSignIn>
      <Link href="/u/egg/add">
        <a>+Add Egg</a>
      </Link>
      <UserEggList />
    </PleaseSignIn>
  );
};

export default Me;
