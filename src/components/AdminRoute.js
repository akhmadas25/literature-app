import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { UserContext } from "../context/userContext";

const AdminRoute = ({ component: Component, ...rest }) => {
  
  const [state, dispatch] = useContext(UserContext);
  const isAdmin = state.isAdmin;

  return (
    <>
      <Route
        {...rest}
        render={(props) =>
          isAdmin ? <Component {...props} /> : <Redirect to="/404" />
        }
      />
    </>
  );
};

export default AdminRoute;
