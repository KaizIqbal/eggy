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

  const [auth, setAuth] = useState(false);
  const { me } = useUser();

  useEffect(() => {
    if (me) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [me]);

  // ################################################ RENDER ################################################
  return (
    <AuthContext.Provider value={{ auth }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
