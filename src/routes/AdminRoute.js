import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { isAdmin } from '../utils/helpers';
import { useEffect } from 'react';
import { message } from 'antd';

export const AdminRoute = ({ children }) => {
  let location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user  = useSelector((state) => (state.auth?.user));

  useEffect(() => {
    if (user && !isAdmin(user)) {
      message.error('You are not authorize');
      navigate('/');
    };
  }, [dispatch, location, navigate, user]);


  // if (!isAdmin(user)) {
  //   return <Navigate to="/" state={{ from: location }} />;
  // };

  return children;
};