import { PleaseSignIn, Owner, UserEggList } from "../../components";
import Link from "next/link";
import { useRouter } from "next/router";
//##### PAGE #####
const Me = () => {
  const router = useRouter();
  return (
    <PleaseSignIn>
      <Owner username={router.query.user}>
        {/* Dynamic routes for add egg to user with username */}
        <Link href="/[user]/add" as={`/${router.query.user}/add`}>
          <a>+Add Egg</a>
        </Link>

        {/* List of user egg with operations */}
        <UserEggList username={router.query.user} />
      </Owner>
    </PleaseSignIn>
  );
};

export default Me;
