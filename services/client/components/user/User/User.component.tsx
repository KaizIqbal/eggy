import Link from "next/link";
import React from "react";
import useUser from "../../../hooks/user";
import LogOut from "../LogOut/LogOut.component";

// ##### COMPONENT PROPS TYPE #####

interface IUserProps {
  children: any;
}

// ##### COMPONENT #####

const User: React.FunctionComponent<IUserProps> = props => {
  // ##### HOOKS #####

  const { me, loading, error } = useUser();

  // ##### RENDER #####

  if (loading || !me) return props.children;
  if (error) return <p>Error! ${error.message}</p>;

  if (me)
    return (
      <p>
        <Link href="/u">
          <a>{me.name}</a>
        </Link>
        <br />
        <LogOut />
      </p>
    );
};

export default User;
