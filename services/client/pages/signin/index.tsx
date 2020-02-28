import { NextPage } from "next";

// Paths
import paths from "../../paths";

// Components
import { Signin } from "../../components";
import Link from "../../components/layout/Link";

// ################################################ NEXT PAGE PROPS ################################################

interface IProps {}

// ################################################ NEXT PAGE ################################################
const SigninPage: NextPage<IProps> = props => (
  <>
    <Signin />
    <Link to={paths.request}>
      <a>Forget Password</a>
    </Link>
  </>
);

export default SigninPage;
