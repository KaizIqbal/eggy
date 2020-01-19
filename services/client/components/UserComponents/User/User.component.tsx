import React from "react";
import useUser from "./User.hooks";
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

  if (loading) return props.children;
  if (error) return <p>Error! ${error.message}</p>;

  if (me)
    return (
      <p>
        {me.name}
        <br />
        <LogOut />
      </p>
    );
  if (!me) return props.children;
};

export default User;
