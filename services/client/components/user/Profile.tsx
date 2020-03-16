import React from "react";

// ################################################ COMPONENT'S TYPE ####################################

interface IProps {
  username: any;
}

// ################################################ COMPONENT ###############################################
const UserProfile: React.FunctionComponent<IProps> = ({ username }) => {
  // ################################################ HOOKS ################################################
  // TODO

  // ################################################ RENDER #####################################################
  return <p>{username} public page</p>;
};

export default UserProfile;
