import React from "react";
import { NextPage } from "next";

// Components
import { Reset } from "../../components";

// ################################################ NEXT PAGE PROPS ################################################

interface IProps {
  query: {
    token: string;
  };
}

// ################################################ NEXT PAGE ################################################
const ResetPage: NextPage<IProps> = ({ query: { token } }) => {
  return (
    <div>
      <Reset token={token} />
    </div>
  );
};

export default ResetPage;
