import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    console.log("inside useEffect");

    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const login = (username) => {
    try {
      const userData = { username:username };
      console.log("logindata",userData);
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return true
    } catch (error) {
      console.log(error);
      return false
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
