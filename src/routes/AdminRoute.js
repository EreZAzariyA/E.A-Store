import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { isAdmin } from '../utils/helpers';
import { useEffect } from 'react';
import { message } from 'antd';
import { logout } from '../redux/slicers/auth-slicer';

export const AdminRoute = ({ children }) => {
  let location = useLocation();
  const dispatch = useDispatch();
  const user  = useSelector((state) => (state.auth?.user));

  useEffect(() => {
    if (user && !isAdmin(user)) {
      message.error('You are not authorize')
      dispatch(logout());
    };
  }, [dispatch, location, user]);

  if (!isAdmin(user)) {
    return <Navigate to="/auth/login" state={{ from: location }} />;
  };

  return children;
};