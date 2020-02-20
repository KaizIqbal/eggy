import Link from "next/link";
import User from "../user/User";

const Nav = () => {
  return (
    <>
      <br />
      <Link href="/">
        <a>Home!</a>
      </Link>
      <br />
      <Link href="/basket">
        <a>Basket</a>
      </Link>
      <User>
        <br />
        <Link href="/signup">
          <a>Signup</a>
        </Link>
        <br />
        <Link href="/signin">
          <a>Signin</a>
        </Link>
      </User>
    </>
  );
};

export default Nav;
