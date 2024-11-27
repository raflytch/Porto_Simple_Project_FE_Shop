import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
} from '../features/auth/authSlice';
import { loginService } from '../services/auth.service';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, user, error } = useSelector(
    (state) => state.auth
  );

  const login = async (credentials) => {
    try {
      dispatch(loginStart());
      const result = await loginService({
        username: credentials.username,
        password: credentials.password,
      });

      if (result.success) {
        dispatch(loginSuccess(result.user));
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'Welcome back!',
          timer: 1500,
        });
        navigate('/');
      } else {
        dispatch(loginFailure(result.error));
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: result.error,
        });
        navigate('/login');
      }
    } catch (error) {
      dispatch(loginFailure('An unexpected error occurred'));
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An unexpected error occurred',
      });
      navigate('/login');
    }
  };

  const handleLogout = (callback) => {
    Cookies.remove('token');
    dispatch(logout());
    callback?.();
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  return {
    isAuthenticated,
    isLoading,
    user,
    error,
    login,
    logout: handleLogout,
  };
};
