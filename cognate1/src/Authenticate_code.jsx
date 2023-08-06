import { Navigate, Outlet } from "react-router-dom";
import { useLocation } from "react-router"
import { UserContext } from "./App";
import { useContext } from "react";






const useAuth = () => {
  const { user_code } = useContext(UserContext);
  return user_code && user_code.loggedIn_code;
};

const ProtectedRoutes = () => {
  const location = useLocation()
  const isAuth = useAuth()
  return isAuth ? <Outlet /> : <Navigate to="/" replace state={{from: location}}/>;
};

export default ProtectedRoutes;