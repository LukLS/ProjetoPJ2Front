import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../../components/AuthContext';

function RestrictedRoute({ component: Component, ...rest }) {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: '/', state: { from: props.location } }} />
                )
            }
        />
    );
}

export default RestrictedRoute;
