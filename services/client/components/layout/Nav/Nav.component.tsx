import User from "../../user/User/User.component";
import Link from "next/link";

const Nav = () => (
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
      <Link href="/login">
        <a>Login</a>
      </Link>
    </User>
  </>
);

export default Nav;
