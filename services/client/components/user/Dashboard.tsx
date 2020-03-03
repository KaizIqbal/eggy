import React from "react";

// Paths
import paths from "../../paths";

// Components
import Link from "../layout/Link";
import { DashboardBasket } from "../index";

// ################################################ COMPONENT'S TYPE ####################################

interface IProps {
  username: any;
}

// ################################################ COMPONENT ###############################################
const Dashboard: React.FunctionComponent<IProps> = ({ username }) => {
  // ################################################ HOOKS ################################################
  // TODO

  // ################################################ RENDER #####################################################

  return (
    <>
      <Link to={paths.newEgg(username)}>+Add Egg</Link>
      {/* List all user's Eggs*/}
      <DashboardBasket username={username} />
    </>
  );
};

export default Dashboard;
