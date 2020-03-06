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

  const { me, loading } = useUser();

  // Initialize userData from local storage if not it is me that's is null
  const [userData, setUserData] = useState(me);

  useEffect(() => {
    if (me !== undefined) {
      setUserData(me);
    }
  }, [me]);

  // ################################################ RENDER ################################################
  return (
    <AuthContext.Provider value={{ userData: userData, loading: loading }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
