import React, { createContext, useReducer } from "react";
import authReducer from "../reducers/authReducer";

export const authContext = createContext(null);

const AuthContextProvider = props => {
  const [auth, dispatch] = useReducer(authReducer, []);

  return (
    <authContext.Provider value={{ auth, dispatch }}>
      {props.children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
