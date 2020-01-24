import User from "../../UserComponents/User/User.component";

const Nav = () => (
  <>
    <br />
    <a href="/">Home!</a>
    <br />
    <a href="/basket">Basket</a>
    <User>
      <br />
      <a href="/signup">Signup</a>
      <br />
      <a href="/login">Login</a>
    </User>
  </>
);

export default Nav;
