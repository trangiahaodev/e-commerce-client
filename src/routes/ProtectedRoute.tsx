import { useAppSelector } from "../hooks/reduxHooks";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  // 1. Get the authenticated status from Redux
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const location = useLocation();

  // 2. If they are not logged in, kick them back to the login page.
  // We use the `state` prop to remember where they were trying to go,
  // so we can redirect them back there after a successful login.
  if (!isAuthenticated)
    return <Navigate to="/login" state={{ from: location }} replace />;

  // 3. If authenticated, render the requested page
  return <Outlet />;
};

export default ProtectedRoute;
