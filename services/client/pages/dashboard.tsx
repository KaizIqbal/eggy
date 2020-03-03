import { useContext } from "react";
import { NextPage } from "next";

// custom context
import { AuthContext } from "../contexts/authContext";

// Components
import { UserDashboard } from "../components";

// Helper function
import { auth } from "../utils/auth";
import Head from "next/head";

// ################################################ NEXT PAGE PROPS ################################################

interface IProps {}

// ################################################ NEXT PAGE ################################################
const Dashboard: NextPage<IProps> = props => {
  // ################################################ HOOKS ################################################
  const { userData } = useContext(AuthContext);

  // ################################################ RENDER ################################################

  // ####################### Render flow ########################
  // #                                                          #
  // #     user signin => User Dashboard Page                   #
  // #                                                          #
  // ############################################################

  return userData ? (
    <>
      <Head>
        <title> Eggy | {userData.name}'s Dashboard</title>
      </Head>
      <UserDashboard username={userData.username} />
    </>
  ) : (
    <>
      <p>Loading......</p>
    </>
  );
};

Dashboard.getInitialProps = async ctx => {
  // Check user's session
  const token = auth(ctx);
  return { token };
};

export default Dashboard;
