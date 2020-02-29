import React, { createContext, useState, useEffect } from "react";
import useUser from "../hooks/graphql/user";

export const AuthContext = createContext(null);

// ################################################ COMPONENT'S TYPE ####################################

interface IAuthContextProviderProps {}

// ################################################ COMPONENT ###############################################

const AuthContextProvider: React.FunctionComponent<
  IAuthContextProviderProps
> = props => {
  // ################################################ HOOKS  ################################################

  // Initialize auth from local storage if not it is false
  const [auth, setAuth] = useState(undefined);
  useEffect(() => {
    setAuth(() => Boolean(localStorage.getItem("auth") || false));
  }, []);

  const { me, loading } = useUser();

  // Initialize userData from local storage if not it is me that's is null
  const [userData, setUserData] = useState(undefined);

  useEffect(() => {
    setUserData(() => {
      const localData = localStorage.getItem("user");
      return localData ? JSON.parse(localData) : [];
    });
  }, []);

  // Call every times when "me,auth" is changed

  useEffect(() => {
    // If user logged in so store data in local storage
    if (me) {
      setAuth(true);
      localStorage.setItem("auth", auth);
      localStorage.setItem("user", JSON.stringify(me));
    }
    // else if user is not logged in so clear the local storage
    else if (me === null) {
      setAuth(false);
      localStorage.clear();
    }
  }, [me, auth]);

  // ################################################ RENDER ################################################
  return (
    <AuthContext.Provider
      value={{ auth: auth, userData: userData, loading: loading }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
