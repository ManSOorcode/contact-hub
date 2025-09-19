"use client";
import { createContext, ReactNode, useState } from "react";

import { Dispatch, SetStateAction } from "react";

// type User = {
//   id: string;
//   name: string;
//   email: string;
// };

type UserDataContextType = {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
};

type Props = {
  children: ReactNode;
};

export const UserDataContext = createContext<UserDataContextType>({
  query: "",
  setQuery: () => {},
});

export const UserDataProvider = ({ children }: Props) => {
  const [query, setQuery] = useState("");

  return (
    <UserDataContext.Provider value={{ query, setQuery }}>
      {children}
    </UserDataContext.Provider>
  );
};
