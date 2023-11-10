import { isAuthenticated } from '../utils/auth';
import { Navigate } from 'react-router-dom';
import { Fragment } from 'react';
import { PATH_LOGIN } from "../config/paths";

const PrivateRoute = ({ children }) => {
    return (
        isAuthenticated() ?
            <Fragment>
                {children}
            </Fragment>
            : <Navigate to={PATH_LOGIN} />
    );
}

export default PrivateRoute;
