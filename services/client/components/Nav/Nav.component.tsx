import Link from "next/link";

const Nav = () => (
  <>
    <Link prefetch href="/basket">
      <a>Basket</a>
    </Link>
    <br />
    <Link prefetch href="/">
      <a>Home!</a>
    </Link>
  </>
);

export default Nav;
