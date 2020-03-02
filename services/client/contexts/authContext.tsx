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
  const [userData, setUserData] = useState(undefined);

  useEffect(() => {
    setUserData(() => {
      const localData = localStorage.getItem("user");
      return localData ? JSON.parse(localData) : [];
    });
  }, [me]);

  // Call every times when "me,auth" is changed

  useEffect(() => {
    // If user logged in so store data in local storage
    if (me !== undefined) {
      localStorage.setItem("user", JSON.stringify(me));
    }
    // else if user is not logged in so clear the local storage
    else if (me === null) {
      localStorage.clear();
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
