import Link from "next/link";
import React from "react";
import useUser from "../../hooks/graphql/user";
import SignOut from "../user/SignOut";

// ##### COMPONENT PROPS TYPE #####

interface IUserProps {
  children: any;
}

// ##### COMPONENT #####

const User: React.FunctionComponent<IUserProps> = props => {
  // ##### HOOKS #####

  const { me, loading, error } = useUser();

  // ##### RENDER #####

  if (loading) return <p>Loading....</p>;
  if (!me) return props.children;
  if (error) return <p>Error! ${error.message}</p>;

  if (me)
    return (
      <p>
        <Link href="/[user]" as={`/${me.username}`} shallow={true}>
          <a>{me.name}</a>
        </Link>
        <br />
        <SignOut />
      </p>
    );
};

export default User;
