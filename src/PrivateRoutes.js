import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = (props) => {
  const isAuth = props.isAuth;

  return isAuth ? <Outlet /> : <Navigate to="/StudentPortal/login" />;
};

export default PrivateRoutes;
