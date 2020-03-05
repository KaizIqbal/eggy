import React, { useContext } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

// custom context
import { AuthContext } from "../../../contexts/authContext";

// Components
import {} from "../../../components";

// Helper function
import { workshopAuth } from "../../../utils/auth";

// ################################################ NEXT PAGE PROPS ################################################

interface IProps {}

// ################################################ NEXT PAGE ################################################
const WorkshopPage: NextPage<IProps> = props => {
  // ################################################ HOOKS ################################################

  const {
    query: { eggname }
  } = useRouter();

  const { userData } = useContext(AuthContext);

  // ################################################ RENDER ################################################

  // ####################### Render flow ########################
  // #                                                          #
  // #     user signin => Render Workshop                       #
  // #     else => Render Egg                                   #
  // #                                                          #
  // ############################################################

  return userData ? (
    <div>
      <p>{eggname} Workshop </p>
    </div>
  ) : (
    <div>
      {console.log("loading...")}
      <p>Loading......</p>
    </div>
  );
};

// Middleware for checking Authentication
WorkshopPage.getInitialProps = async (ctx: { query }) => {
  // Check user's session
  const token = workshopAuth(ctx, ctx.query.eggname);
  return { token };
};

export default WorkshopPage;
