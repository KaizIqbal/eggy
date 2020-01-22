import Nav from "../Nav/Nav.component";
import { Fragment } from "react";

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
