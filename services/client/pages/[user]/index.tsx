import { PleaseLogIn, Owner, UserEggList } from "../../components";
import Link from "next/link";
import { useRouter } from "next/router";
//##### PAGE #####
const Me = () => {
  const router = useRouter();
  return (
    <PleaseLogIn>
      <Owner username={router.query.user}>
        <UserEggList />
        {/* <Link href="/u/egg/add">
        <a>+Add Egg</a>
      </Link> */}
      </Owner>
    </PleaseLogIn>
  );
};

export default Me;
