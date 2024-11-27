import axiosInstance from '../api/axiosInstance';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export const loginService = async (data) => {
  try {
    const response = await axiosInstance.post('/auth/login', {
      username: data.username,
      password: data.password,
    });
    const { token } = response.data;

    const decodedToken = jwtDecode(token);

    Cookies.set('token', token, { expires: 7 });

    return {
      success: true,
      user: decodedToken,
      token,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message,
    };
  }
};
