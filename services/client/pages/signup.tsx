import React from "react";
import { NextPage } from "next";

// Components
import { Signup } from "../components";

// ################################################ NEXT PAGE PROPS ################################################

interface IProps {}

// ################################################ NEXT PAGE ################################################
const SignupPage: NextPage<IProps> = _props => (
  <div>
    <Signup />
  </div>
);

export default SignupPage;
