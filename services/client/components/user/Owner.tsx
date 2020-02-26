import React from "react";
import useUser from "../../hooks/graphql/user";
import PublicPage from "./Public";
import Head from "next/head";

// ##### COMPONENT PROPS TYPE #####

interface IOwnerProps {
  children: any;
  username: any;
}

// ##### COMPONENT #####

const Owner: React.FunctionComponent<IOwnerProps> = props => {
  // ##### HOOKS #####

  const { me, loading, error } = useUser();

  // ##### RENDER #####

  if (error) return <p>Error! ${error.message}</p>;
  if (loading) return <p>loading....</p>;

  // user not have permission or user not login so render public page
  if (!me || me.username !== props.username) {
    return <PublicPage username={props.username} />;
  }

  // user is Owner so have permission to perform egg operation
  return (
    <>
      <Head>
        <title>Eggy | {me.username}</title>
      </Head>
      {props.children}
    </>
  );
};

export default Owner;
