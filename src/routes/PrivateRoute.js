import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { isAdmin } from '../utils/helpers';

const PrivateRoute = ({ children }) => {
  let location = useLocation();
  const user  = useSelector((state) => (state.authReducer?.user));

  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} />;
  };
  if (user && isAdmin(user)) {
    return <Navigate to="/admin" state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;