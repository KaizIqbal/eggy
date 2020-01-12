import Link from "next/link";

const Nav = () => (
  <>
    <Link href="/basket">
      <a>Basket</a>
    </Link>
    <br />
    <Link href="/">
      <a>Home!</a>
    </Link>
  </>
);

export default Nav;
