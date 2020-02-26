import { Fragment } from "react";
import Nav from "./Nav";
import paths from "../../paths";
import Link from "./Link";

const Header = () => (
  <Fragment>
    <div>
      <Link to={paths.home}>Eggy</Link>
      <Nav />
    </div>
    <div>
      <p>Search</p>
    </div>
  </Fragment>
);

export default Header;
