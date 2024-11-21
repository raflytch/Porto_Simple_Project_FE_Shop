import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { loginSuccess, logout } from '../features/auth/authSlice';

export const AuthMiddleware = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = Cookies.get('token');

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          Cookies.remove('token');
          dispatch(logout());
          navigate('/login');
        } else {
          dispatch(loginSuccess(decodedToken));
        }
      } catch (error) {
        Cookies.remove('token');
        dispatch(logout());
        navigate('/login');
      }
    } else {
      dispatch(logout());
      navigate('/login');
    }
  }, [dispatch, navigate]);

  return children;
};
