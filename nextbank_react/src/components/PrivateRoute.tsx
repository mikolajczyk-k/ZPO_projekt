import React from "react";

import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

interface PrivateRouteProps {
  element: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? element : <Navigate to="/home/login" replace />;
};

export default PrivateRoute;
