import React from "react";

// Paths
import paths from "../../paths";

// Components
import Link from "../layout/Link";
import UserEggList from "../egg/UserEggs";

// ################################################ COMPONENT'S TYPE ####################################

interface IProps {
  username: any;
}

// ################################################ COMPONENT ###############################################
const UserProfile: React.FunctionComponent<IProps> = ({ username }) => {
  // ################################################ HOOKS ################################################
  // TODO

  // ################################################ RENDER #####################################################

  return (
    <>
      <Link to={paths.addEgg(username)}>
        <a title="Add Egg">+Add Egg</a>
      </Link>
      {/* List of user egg with operations */}
      <UserEggList username={username} />
    </>
  );
};

export default UserProfile;
