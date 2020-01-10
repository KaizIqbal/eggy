import Link from "next/link";

const Nav = () => (
  <div>
    <Link href="/basket">
      <a>eggs</a>
    </Link>
    <br />
    <Link href="/">
      <a>Home!</a>
    </Link>
  </div>
);

export default Nav;
