import { NextPage } from "next";

// hooks libraries
import { useRouter } from "next/router";

// Components
import { UserProfile } from "../../components";

// ################################################ NEXT PAGE PROPS ################################################

interface IProps {}

// ################################################ NEXT PAGE ################################################
const Me: NextPage<IProps> = props => {
  // ################################################ HOOKS ################################################

  const {
    query: { user }
  } = useRouter();

  // ################################################ RENDER ################################################

  // ####################### Render flow ########################
  // #                                                          #
  // #     User Profile Component                               #
  // #                                                          #
  // ############################################################

  return <UserProfile username={user} />;
};

export default Me;
