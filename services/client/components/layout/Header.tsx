import React from "react";

// Components
import Nav from "./Nav";
import Link from "./Link";

import AuthContextProvider from "../../contexts/authContext";

// Contains all routes
import paths from "../../paths";

// ################################################ COMPONENT'S TYPE ####################################

interface IProps {}

// ################################################ COMPONENT ###############################################
const Header: React.FunctionComponent<IProps> = _props => {
  // ################################################ RENDER #####################################################
  return (
    <>
      <div>
        <Link to={paths.home}>Eggy</Link>
        <AuthContextProvider>
          <Nav />
        </AuthContextProvider>
      </div>
      <div>
        <p>Search</p>
      </div>
    </>
  );
};

export default Header;
