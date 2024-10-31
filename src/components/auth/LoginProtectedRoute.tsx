import {Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import React from "react";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const LoginProtectedRoute = ({children}: ProtectedRouteProps) => {
    const user = useSelector((state: RootState) => state.user);

    if (!user.developerId) {
        return <Navigate to="/login" replace/>;
    }

    return children;
};

export default LoginProtectedRoute;
