import React from "react";

// Components
import { DashboardBasket, CreateEgg } from "../index";

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
      <CreateEgg />
      {/* List all user's Eggs*/}
      <DashboardBasket username={username} />
    </>
  );
};

export default Dashboard;
