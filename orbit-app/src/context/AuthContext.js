import React, { createContext, useState } from "react";
import { useHistory } from "react-router";

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  let expiresAt = localStorage.getItem("expiresAt");
  let userInfo = localStorage.getItem("userInfo");

  const [authState, setAuthState] = useState({
    expiresAt: expiresAt ? parseInt(expiresAt) : null,
    userInfo: userInfo ? JSON.parse(userInfo) : {},
    token: null,
  });

  const history = useHistory();

  const isAuthenticated = () => {
    if (!authState.expiresAt) return false;

    return new Date().getTime() < authState.expiresAt * 1000;
  };

  const setAuthInfo = ({ token = null, userInfo, expiresAt }) => {
    localStorage.setItem("expiresAt", expiresAt);
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    setAuthState({ token, userInfo, expiresAt });
  };

  const logout = () => {
    localStorage.removeItem("expiresAt");
    localStorage.removeItem("userInfo");
    setAuthState({ userInfo: {}, expiresAt: null });
    history.push("/login");
  };

  const isAdmin = () =>
    authState.userInfo && authState.userInfo.role === "admin";

  return (
    <Provider
      value={{
        authState,
        setAuthState: (authInfo) => setAuthInfo(authInfo),
        isAuthenticated,
        logout,
        isAdmin,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
