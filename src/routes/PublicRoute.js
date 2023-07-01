import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { isAdmin } from "../utils/helpers";
import { message } from "antd";

export const PublicRoute = ({children}) => {
  let location = useLocation();
  const user  = useSelector((state) => (state.auth?.user));

  useEffect(() => {
    if (user) {
      message.info('Your already logged in');
    }
  }, []);

  if (user && isAdmin(user)) {
    return <Navigate to="/admin" state={{ from: location }} />;
  };
  if (user) {
    return <Navigate to="/" state={{ from: location }} />;
  };


  return children;
};