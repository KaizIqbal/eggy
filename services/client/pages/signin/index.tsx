import { NextPage } from "next";

// Components
import { Signin } from "../../components";
import Link from "../../components/layout/Link";

// Contains all routes
import paths from "../../paths";

// Helper function
import { signinAuth } from "../../utils/auth";

// ################################################ NEXT PAGE PROPS ################################################

interface IProps {}

// ################################################ NEXT PAGE ################################################
const SigninPage: NextPage<IProps> = props => (
  <div>
    <Signin />
    <Link to={paths.request}>Forget Password</Link>
  </div>
);

SigninPage.getInitialProps = async ctx => {
  // Check user's session
  // If user already signin so redirect to user's dashboard
  // Check user's session
  const token = signinAuth(ctx);
  return { token };
};

export default SigninPage;
