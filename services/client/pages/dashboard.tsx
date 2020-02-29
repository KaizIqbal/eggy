import { useContext } from "react";
import { NextPage } from "next";

// custom context
import { AuthContext } from "../contexts/authContext";

// Components
import { UserDashboard } from "../components";
import Router from "next/router";

// ################################################ NEXT PAGE PROPS ################################################

interface IProps {}

// ################################################ NEXT PAGE ################################################
const Dashboard: NextPage<IProps> = props => {
  // ################################################ HOOKS ################################################

  const { auth, userData, loading } = useContext(AuthContext);
  // ################################################ RENDER ################################################

  // ####################### Render flow ########################
  // #                                                          #
  // #     user signin => User Dashboard Page                   #
  // #                                                          #
  // ############################################################

  if (auth) return <UserDashboard username={userData.username} />;
  if (loading) return <p>Loading......</p>;
  if (!loading) return <p>Checking Authorization</p>;
  return Router.push("/");
};

export default Dashboard;
