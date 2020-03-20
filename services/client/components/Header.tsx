import React from "react";
import Link from "next/link";

import { useMeQuery } from "generated/graphql";

import { Signout } from "components/auth";

interface Props {}

export const Header: React.FC<Props> = () => {
  const { data, loading } = useMeQuery();

  let body: any = null;

  if (loading) {
    body = <p>Loading.....</p>;
  } else if (data && data.me) {
    body = (
      <>
        {" "}
        <Link href="/[username]" as={`/${data.me.username}`}>
          <a> {data.me.firstName}</a>
        </Link>{" "}
        |{" "}
        <Link href="/dashboard">
          <a>Dashboard</a>
        </Link>{" "}
        | <Signout />
      </>
    );
  } else {
    body = (
      <>
        {" "}
        <Link href="/signin">
          <a>Signin</a>
        </Link>{" "}
        |{" "}
        <Link href="/signup">
          <a>Signup</a>
        </Link>
      </>
    );
  }

  return (
    <header>
      <nav>
        <Link href="/">
          <a>Eggy</a>
        </Link>{" "}
        |{" "}
        <Link href="/basket">
          <a>Basket</a>
        </Link>{" "}
        |{body}
      </nav>
    </header>
  );
};
