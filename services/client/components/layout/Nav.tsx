import React, { useContext } from "react";

// Components
import Link from "./Link";

// Contains all routes
import paths from "../../paths";
import { AuthContext } from "../../contexts/authContext";

import Signout from "../auth/Signout";
// ################################################ COMPONENT'S TYPE ####################################

interface IProps {}

// ################################################ COMPONENT ###############################################
const Nav: React.FunctionComponent<IProps> = props => {
  const { userData } = useContext(AuthContext);

  // ################################################ RENDER #####################################################
  return (
    <>
      <br />
      <Link to={paths.home}>Home</Link>
      <br />
      <Link to={paths.basket}>Basket</Link>
      <br />
      {userData ? (
        <>
          <Link to={paths.user(userData.username)}>{userData.name}</Link>
          <br />
          <Signout />
        </>
      ) : (
        <>
          <Link to={paths.signin}>Signin</Link>
          <br />
          <Link to={paths.signup}>Signup</Link>
        </>
      )}
    </>
  );
};

export default Nav;
