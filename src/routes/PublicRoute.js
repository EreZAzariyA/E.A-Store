import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export const PublicRoute = ({children}) => {
  let location = useLocation();
  const user  = useSelector((state) => (state.authReducer?.user));

  if (user) {
    return <Navigate to="/" state={{ from: location }} />;
  };

  return children;
};