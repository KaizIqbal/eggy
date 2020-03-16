import React from "react";
import { NextPage } from "next";

// Components
import { RequestReset } from "../../components";

// ################################################ NEXT PAGE PROPS ################################################

interface IProps {}

// ################################################ NEXT PAGE ################################################
const RequestResetPage: NextPage<IProps> = _props => (
  <div>
    <RequestReset />
  </div>
);

export default RequestResetPage;
