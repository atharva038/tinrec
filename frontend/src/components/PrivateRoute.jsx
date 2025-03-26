import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

const PrivateRoute = () => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setAuth(!!token); // Convert to boolean
  }, []);

  return auth ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
