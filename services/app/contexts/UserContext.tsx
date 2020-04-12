import React, { createContext, useMemo } from "react";
import { useMeQuery } from "generated/graphql";

export interface IData {
  data: any;
  loading: boolean;
}

const initialData: IData = {
  data: undefined,
  loading: true
};

export const UserContext = createContext<IData>(initialData);

interface IProps {}

export const UserContextProvider: React.FC<IProps> = props => {
  // ##### HOOKS #####

  const { data, loading } = useMeQuery();

  const providerValue = useMemo(() => {
    return { data, loading };
  }, [data, loading]);

  // ##### PROVIDER #####
  return (
    <UserContext.Provider value={providerValue}>
      {props.children}
    </UserContext.Provider>
  );
};
