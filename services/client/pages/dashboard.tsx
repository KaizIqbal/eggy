import React, { useContext } from "react";
import { NextPage } from "next";
import Head from "next/head";

// custom context
import { AuthContext } from "contexts/authContext";

// Components
import { UserDashboard } from "components";
import { getAccessToken } from "utils/accessToken";

// Helper function
// import { dashboardAuth } from "utils/auth";

// ################################################ NEXT PAGE PROPS ################################################

interface IProps {}

// ################################################ NEXT PAGE ################################################
const Dashboard: NextPage<IProps> = _props => {
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
        <title>{userData.firstName}'s Dashboard - Eggy</title>
        <title>Dashboard - Eggy</title>
      </Head>
      <UserDashboard username={userData.username} />
    </>
  ) : (
    <>
      <p>Loading..</p>
    </>
  );
};

export default Dashboard;

Dashboard.getInitialProps = async () => {
  console.log(getAccessToken());
  return {};
};
