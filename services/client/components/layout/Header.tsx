import { Fragment } from "react";
import Nav from "./Nav";

const Header = () => (
  <Fragment>
    <div>
      <a href="/">Eggy</a>
      <Nav />
    </div>
    <div>
      <p>Search</p>
    </div>
  </Fragment>
);

export default Header;
