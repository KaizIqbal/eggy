import React from "react";

// Components
import Header from "./Header";
// ################################################ COMPONENT'S TYPE ####################################

interface IProps {}

// ################################################ COMPONENT ###############################################
const Page: React.FunctionComponent<IProps> = props => {
  // ################################################ RENDER #####################################################

  return (
    <div>
      <Header />
      {props.children}
    </div>
  );
};

export default Page;
