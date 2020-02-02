import Link from "next/link";
import { useRouter } from "next/router";
import { Owner, UserEggList } from "../../components";
//##### PAGE #####
const Me = () => {
  const router = useRouter();
  return (
    <Owner username={router.query.user}>
      {/* Dynamic routes for add egg to user with username */}
      <Link href="/[user]/add" as={`/${router.query.user}/add`}>
        <a>+Add Egg</a>
      </Link>

      {/* List of user egg with operations */}
      <UserEggList username={router.query.user} />
    </Owner>
  );
};

export default Me;
