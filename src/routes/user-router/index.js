import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authServices } from '../../services/auth-services';
import { isAdmin } from "../../utils/helpers";
import { Button } from 'antd';

export const UserRoute = ({ children }) => {
  let location = useLocation();
  const user  = useSelector((state) => (state.auth?.user));

  const logout = () => {
    authServices.logout();
  };

  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} />;
  } else if (user && isAdmin(user)) {
    return (
      <>
        <p style={{ textTransform: 'capitalize'}}>you are not in the correct url</p>
        <Button danger onClick={logout}>Logout</Button>
      </>
    );
  }

  return children;
};
