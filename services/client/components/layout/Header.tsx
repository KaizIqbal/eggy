import React from "react";

// Components
import Nav from "./Nav";
import Link from "./Link";

// Contains all routes
import paths from "../../paths";

// ################################################ COMPONENT'S TYPE ####################################

interface IProps {}

// ################################################ COMPONENT ###############################################
const Header: React.FunctionComponent<IProps> = props => {
  // ################################################ RENDER #####################################################
  return (
    <>
      <div>
        <Link to={paths.home}>Eggy</Link>
        <Nav />
      </div>
      <div>
        <p>Search</p>
      </div>
    </>
  );
};

export default Header;
