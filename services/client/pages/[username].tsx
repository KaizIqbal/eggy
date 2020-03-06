import { NextPage } from "next";

// hooks libraries
import { useRouter } from "next/router";

// Components
import { UserProfile } from "../components";

// ################################################ NEXT PAGE PROPS ################################################

interface IProps {}

// ################################################ NEXT PAGE ################################################
const Me: NextPage<IProps> = props => {
  // ################################################ HOOKS ################################################

  const {
    query: { username }
  } = useRouter();

  // ################################################ RENDER ################################################

  // ####################### Render flow ########################
  // #                                                          #
  // #     User Profile Component                               #
  // #                                                          #
  // ############################################################

  return <UserProfile username={username} />;
};

Me.getInitialProps = async ({ res, query }) => {
  const slug: any = query.username;

  // If slug is valid
  // Checking by @ at starting of the slug then it is username
  if (slug.startsWith("@")) {
    return {};
  }

  // if not then redirected to search
  res.writeHead(302, { Location: `/s/${slug}` });
  res.end();
  res.finished = true;
  return;
};
export default Me;
