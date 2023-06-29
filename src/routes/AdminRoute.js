import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { isAdmin } from '../utils/helpers';
import { AuthActions } from '../redux/actions';
import { useEffect } from 'react';
import { message } from 'antd';

export const AdminRoute = ({ children }) => {
  let location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user  = useSelector((state) => (state.authReducer?.user));

  useEffect(() => {
    if (user && !isAdmin(user)) {
      message.error('You are not authorize')
      dispatch(AuthActions.logout());
    }
  }, [dispatch, location, navigate, user]);

  if (!isAdmin(user)) {
    return <Navigate to="/auth/login" state={{ from: location }} />;
  };

  return children;
};