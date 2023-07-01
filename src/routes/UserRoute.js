import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

export const UserRoute = ({ children }) => {
  let location = useLocation();
  const user  = useSelector((state) => (state.auth?.user));

  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} />;
  };

  return children;
};
