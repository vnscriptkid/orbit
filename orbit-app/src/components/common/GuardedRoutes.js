import React, { useContext } from "react";
import { Redirect, Route } from "react-router";
import AppShell from "../../AppShell";
import { AuthContext } from "../../context/AuthContext";

export const AuthenticatedRoute = ({ children, ...rest }) => {
  const authContext = useContext(AuthContext);

  return authContext.isAuthenticated() ? (
    <Route {...rest}>
      <AppShell>{children}</AppShell>
    </Route>
  ) : (
    <Redirect to="/" />
  );
};

export const LoggedOutRoute = ({ children, ...rest }) => {
  const authContext = useContext(AuthContext);

  return !authContext.isAuthenticated() ? (
    <Route {...rest}>{children}</Route>
  ) : (
    <Redirect to="/" />
  );
};

export const AdminRoute = ({ children, ...rest }) => {
  const authContext = useContext(AuthContext);

  return authContext.isAdmin() ? (
    <Route {...rest}>
      <AppShell>{children}</AppShell>
    </Route>
  ) : (
    <Redirect to="/" />
  );
};
