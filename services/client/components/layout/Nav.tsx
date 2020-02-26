import Link from "./Link";
import paths from "../../paths";
import User from "../user/User";

const Nav = () => {
  return (
    <>
      <br />
      <Link to={paths.home}>Home</Link>
      <br />
      <Link to={paths.basket}>Basket</Link>
      <User>
        <br />
        <Link to={paths.signin}>Signin</Link>
        <br />
        <Link to={paths.signup}>Signup</Link>
      </User>
    </>
  );
};

export default Nav;
