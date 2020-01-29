import React, { Fragment } from "react";
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
        {me.name}
        <br />
        <LogOut />
      </p>
    );
};

export default User;
