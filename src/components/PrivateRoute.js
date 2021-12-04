// import necessary utility from rrd
import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { UserContext } from "../context/userContext";

// create component here
const PrivateRoute = ({ component: Component, ...rest }) => {
  // create statement for validation (by hardcode first)
  const [state, dispatch] = useContext(UserContext);
  const isLogin = state.isLogin;

  return (
    <>
      <Route
        {...rest}
        render={(props) =>
          isLogin ? <Component {...props} /> : <Redirect to="/404" />
        }
      />
    </>
  );
};

export default PrivateRoute;
