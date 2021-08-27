import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { Context } from "../utils/context";

const ProtectedRoute = ({ component: Component, ...props }) => {
  
    const [state, dispatch] = useContext(Context)
    const isAuthenticated = state.user.username ? true : false
    return (
        <Route
        render={props =>
            isAuthenticated ? (
            <Component {...props} />
            ) : (
            <Redirect
                to={{
                pathname: "/signin",
                state: { from: props.location }
                }}
            />
            )
        }
        />
    );
}

export default ProtectedRoute;