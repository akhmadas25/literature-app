import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { useEffect, useContext } from "react";
import PrivateRoute from "../components/PrivateRoute";
import AdminRoute from "../components/AdminRoute";
import { UserContext } from "../context/userContext";
import { API, setAuthToken } from "../config/api";

import PageNotFound from "../components/PageNotFound";
import Landing from "../pages/user/Landing";
import Home from "../pages/user/Home";
import Literaturs from "../pages/admin/Literaturs";
import AddLiteratur from "../pages/user/AddLiteratur";
import Collection from "../pages/user/Collection";
import DetailLiteratur from "../pages/user/DetailLiteratur";
import SearchPage from "../components/SearchPage";
import Profile from "../pages/user/Profile";
import { createBrowserHistory } from "history";
import DetailCollection from "../pages/user/DetailCollection";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const Router = () => {
  const [state, dispatch] = useContext(UserContext);
  console.clear();
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/checkAuth");

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }
      console.log(response);
      // Get user data
      let payload = response.data.data;

      // Get token from local storage
      payload.token = localStorage.token;
      if (payload.status === "admin") {
        dispatch({
          type: "ADMIN_SUCCESS",
          payload,
        });
      } else {
        dispatch({
          type: "USER_SUCCESS",
          payload,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: "AUTH_ERROR",
      });
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  if (state.isLoading) {
    return <p>loading</p>;
  } else {
    return (
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/404" exact component={PageNotFound} />
        <PrivateRoute path="/home" exact component={Home} />
        <AdminRoute path="/admin/literaturs" exact component={Literaturs} />
        <PrivateRoute path="/addLiteratur" exact component={AddLiteratur} />
        <PrivateRoute path="/myCollection" exact component={Collection} />
        <PrivateRoute
          path="/collection/:id"
          exact
          component={DetailCollection}
        />
        <PrivateRoute path="/literatur/:id" exact component={DetailLiteratur} />
        <PrivateRoute path="/search" exact component={SearchPage} />
        <PrivateRoute path="/profile" exact component={Profile} />
      </Switch>
    );
  }
};

export default Router;
