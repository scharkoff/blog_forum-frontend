import axios from 'axios';
import Cookies from 'js-cookie';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  sameSite: 'none',
});

instance.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status == 403 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/auth/refresh`,
          {
            withCredentials: true,
          },
        );

        Cookies.set('token', response.data.accessToken, {
          domain: 'sharkov-blog.onrender.com',
          secure: true,
        });

        return instance.request(originalRequest);
      } catch (error) {
        Cookies.remove('token');
        window.location.reload();
      }
    }
    return Promise.reject(error);
  },
);

export default instance;
