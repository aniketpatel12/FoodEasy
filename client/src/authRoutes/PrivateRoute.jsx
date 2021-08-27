import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...props }) => {
  
    const isAuthenticated = props.location.state?.isClick ? true : false
    return (
        <Route
            render={props =>
            isAuthenticated ? (
            <Component {...props} />
            ) : (
            <Redirect
                to={{
                pathname: "/",
                state: { from: props.location }
                }}/>
            )
        }
        />
    );
}

export default PrivateRoute;