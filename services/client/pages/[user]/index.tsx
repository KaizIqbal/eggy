import { useContext } from "react";
import { NextPage } from "next";

// hooks libraries
import { useRouter } from "next/router";

// custom context
import { AuthContext } from "../../contexts/authContext";

// Components
import { UserPublic, UserProfile } from "../../components";

// ################################################ NEXT PAGE PROPS ################################################

interface IProps {}

// ################################################ NEXT PAGE ################################################
const Me: NextPage<IProps> = props => {
  // ################################################ HOOKS ################################################

  const {
    query: { user }
  } = useRouter();

  const { auth } = useContext(AuthContext);

  // ################################################ RENDER ################################################

  // ####################### Render flow ########################
  // #                                                          #
  // #     user signin => User Profile Page                     #
  // #     else => User Public Page                             #
  // #                                                          #
  // ############################################################

  if (auth) return <UserProfile username={user} />;

  return <UserPublic username={user} />;
};

export default Me;
