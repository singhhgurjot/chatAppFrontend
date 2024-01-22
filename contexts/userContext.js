import { createContext, useContext, useState } from "react";
const UserType = createContext();
const UserContext = ({ children }) => {
  const [userId, setUserId] = useState("hello");
  return (
    <UserType.Provider value={{ userId, setUserId }}>
      {children}
    </UserType.Provider>
  );
};
export { UserType, UserContext };
