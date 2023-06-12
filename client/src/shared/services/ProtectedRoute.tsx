import React from "react";
import { Route, Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  path: string;
  isAuthenticated: boolean;
  isAdminRoute?: boolean;
  redirectTo?: string;
  component: React.ComponentType<any>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  path,
  isAuthenticated,
  isAdminRoute,
  redirectTo = '/account/login',
  component: Component,
  ...rest
}) => {
  if (isAuthenticated) {
    // Render the protected route if the user is authenticated
    return <Route {...rest} path={path} element={<Component />} />;
  } else {
    // Redirect to the specified route if the user is not authenticated
    return <Navigate to={redirectTo} replace />;
  }
};

export default ProtectedRoute;
