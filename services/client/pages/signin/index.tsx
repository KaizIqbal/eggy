import { NextPage } from "next";
import nextCookie from "next-cookies";
import Router from "next/router";

// Components
import { Signin } from "../../components";
import Link from "../../components/layout/Link";

// Contains all routes
import paths from "../../paths";

// ################################################ NEXT PAGE PROPS ################################################

interface IProps {}

// ################################################ NEXT PAGE ################################################
const SigninPage: NextPage<IProps> = props => (
  <>
    <Signin />
    <Link to={paths.request}>Forget Password</Link>
  </>
);

SigninPage.getInitialProps = async ctx => {
  // Check user's session
  // If user already signin so redirect to user's dashboard
  const { auth } = nextCookie(ctx);
  if (ctx.req && auth) {
    ctx.res.writeHead(302, { Location: paths.dashboard });
    ctx.res.end();
    return;
  }

  if (auth) {
    Router.push(paths.dashboard);
  }

  return { auth };
};

export default SigninPage;
