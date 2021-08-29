import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import {
  AdminRoute,
  AuthenticatedRoute,
  LoggedOutRoute,
} from "./components/common/GuardedRoutes";
import { AuthProvider } from "./context/AuthContext";
import { FetchProvider } from "./context/FetchContext";
import FourOFour from "./pages/FourOFour";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Account = lazy(() => import("./pages/Account"));
const Inventory = lazy(() => import("./pages/Inventory"));
const Settings = lazy(() => import("./pages/Settings"));
const Users = lazy(() => import("./pages/Users"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <LoggedOutRoute path="/login">
          <Login />
        </LoggedOutRoute>
        <LoggedOutRoute path="/signup">
          <Signup />
        </LoggedOutRoute>
        <Route exact path="/">
          <Home />
        </Route>
        <AuthenticatedRoute path="/dashboard">
          <Dashboard />
        </AuthenticatedRoute>
        <AdminRoute path="/inventory">
          <Inventory />
        </AdminRoute>
        <AuthenticatedRoute path="/account">
          <Account />
        </AuthenticatedRoute>
        <AuthenticatedRoute path="/settings">
          <Settings />
        </AuthenticatedRoute>
        <AdminRoute path="/users">
          <Users />
        </AdminRoute>
        <Route path="*">
          <FourOFour />
        </Route>
      </Switch>
    </Suspense>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <FetchProvider>
          <div className="bg-gray-100">
            <AppRoutes />
          </div>
        </FetchProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
