import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { isAdmin } from "../utils/helpers";

export const UserRoute = ({ children }) => {
  let location = useLocation();
  const user  = useSelector((state) => (state.auth?.user));

  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} />;
  }
  if (isAdmin(user)) {
    return <Navigate to="/admin" state={{ from: location }} />;
  }

  return children;
};
