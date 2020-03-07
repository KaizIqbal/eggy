import { NextPage } from "next";

// ################################################ NEXT PAGE PROPS ################################################

interface IProps {}

// ################################################ NEXT PAGE ################################################
const Index: NextPage<IProps> = _props => (
  <div>
    <h1>This is Home</h1>
  </div>
);

export default Index;
