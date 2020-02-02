import { PleaseSignIn, Owner, UserEggList } from "../../components";
import Link from "next/link";
import { useRouter } from "next/router";
//##### PAGE #####
const Me = () => {
  const router = useRouter();
  return (
    <PleaseSignIn>
      <Owner username={router.query.user}>
        <UserEggList />
        {/* <Link href="/u/egg/add">
        <a>+Add Egg</a>
      </Link> */}
      </Owner>
    </PleaseSignIn>
  );
};

export default Me;
