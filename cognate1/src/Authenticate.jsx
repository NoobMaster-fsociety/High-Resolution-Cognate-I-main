import { Navigate, Outlet } from "react-router-dom";
import { useLocation } from "react-router"
import { UserContext } from "./App";
import { useContext } from "react";






const useAuth = () => {
  const { user } = useContext(UserContext);
  return user && user.loggedIn;
};

const ProtectedRoutes = () => {
  const location = useLocation()
  const isAuth = useAuth()
  return isAuth ? <Outlet /> : <Navigate to="High-Resolution-Cognate-I" replace state={{from: location}}/>;
};

export default ProtectedRoutes;