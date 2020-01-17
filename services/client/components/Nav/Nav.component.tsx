import Link from "next/link";
import User from "../User/User.component";

const Nav = () => (
  <div>
    <User />
    <Link href="/basket">
      <a>Basket</a>
    </Link>
    <br />
    <Link href="/">
      <a>Home!</a>
    </Link>
  </div>
);

export default Nav;
