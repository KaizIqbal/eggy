import { Signin } from "../../components";
import paths from "../../paths";
import Link from "../../components/layout/Link";

// ##### PAGE #####
const SigninPage = props => (
  <>
    <Signin />
    <Link to={paths.request}>
      <a>Forget Password</a>
    </Link>
  </>
);

export default SigninPage;
