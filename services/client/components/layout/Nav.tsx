import React from "react";

// Components
import Link from "./Link";
import User from "../user/User";

// Contains all routes
import paths from "../../paths";

// ################################################ COMPONENT'S TYPE ####################################

interface IProps {}

// ################################################ COMPONENT ###############################################
const Nav: React.FunctionComponent<IProps> = props => {
  // ################################################ RENDER #####################################################
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
