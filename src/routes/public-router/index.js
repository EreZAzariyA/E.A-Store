import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { isAdmin } from "../../utils/helpers";

export const PublicRoute = ({children}) => {
  let location = useLocation();
  const user  = useSelector((state) => (state.auth?.user));

  if (user) {
    if (user && isAdmin(user)) {
      return <Navigate to="/admin" state={{ from: location }} />;
    }
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
};