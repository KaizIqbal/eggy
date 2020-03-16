import React from "react";
import { NextPage } from "next";

// Components
import { Signin } from "../../components";
import Link from "../../components/layout/Link";

// Contains all routes
import paths from "../../paths";

// Helper function
// import { signinAuth } from "../../utils/auth";

// ################################################ NEXT PAGE PROPS ################################################

interface IProps {}

// ################################################ NEXT PAGE ################################################
const SigninPage: NextPage<IProps> = _props => (
  <div>
    <Signin />
    <Link to={paths.request}>Forget Password</Link>
  </div>
);

export default SigninPage;
