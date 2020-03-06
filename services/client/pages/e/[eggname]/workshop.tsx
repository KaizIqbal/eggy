import React, { useContext } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

// custom context
import { AuthContext } from "../../../contexts/authContext";

// Components
import { Workshop } from "../../../components";

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
    <>
      <Workshop eggname={eggname} username={userData.username} />
    </>
  ) : (
    <>
      <Head>
        <title>Loading.. - Eggy Workshop</title>
      </Head>
      <p>Loading......</p>
    </>
  );
};

// Middleware for checking Authentication
WorkshopPage.getInitialProps = async (ctx: { query }) => {
  // Check user's session
  const token = workshopAuth(ctx, ctx.query.eggname);
  return { token };
};

export default WorkshopPage;
