import React from "react";
import useUser from "../../../hooks/user";

// ##### COMPONENT PROPS TYPE #####

interface IUserPublicProps {
  username: any;
}

// ##### COMPONENT #####

const UserPublic: React.FunctionComponent<IUserPublicProps> = props => {
  // ##### RENDER #####

  // user not hve permission so render public page
  return <p>{props.username} public page</p>;
};

export default UserPublic;
