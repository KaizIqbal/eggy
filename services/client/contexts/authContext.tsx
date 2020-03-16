import React, { createContext, useState, useEffect } from "react";
import useUser from "../hooks/graphql/user";

interface IData {
  userData: any;
  loading: any;
}

const initialData: IData = {
  userData: undefined,
  loading: undefined
};

export const AuthContext = createContext(initialData);

// ################################################ COMPONENT'S TYPE ####################################

interface IProps {}

// ################################################ COMPONENT ###############################################

const AuthContextProvider: React.FunctionComponent<IProps> = props => {
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
    <AuthContext.Provider value={{ userData, loading }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
