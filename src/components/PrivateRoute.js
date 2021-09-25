import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ children, ...rest }) => {
    const auth = rest.auth

    return (
        <Route {...rest} render={(...rest) => {

            return auth
                ? children
                : <Redirect to='/' />

        }} />
    )
}