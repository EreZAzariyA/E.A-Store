import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { isAdmin } from '../utils/helpers';

const AdminRoute = ({ children }) => {
  let location = useLocation();
  const user  = useSelector((state) => (state.authReducer?.user));

  if (!user && !isAdmin(user)) {
    return <Navigate to="/auth/login" state={{ from: location }} />;
  };

  return children;
};

export default AdminRoute;