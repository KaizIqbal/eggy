import { PleaseSignIn, UserEggList } from "../../components";
import Link from "next/link";
//##### PAGE #####
const Me = () => {
  return (
    <PleaseSignIn>
      <Link href="/u/egg/add">
        <a>+Add Egg</a>
      </Link>
      <UserEggList username="323" />
    </PleaseSignIn>
  );
};

export default Me;
