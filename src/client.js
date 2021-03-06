import axios from 'axios';
import loginPath from '@/auth/loginPath';

const instance = axios.create({
  baseURL: 'https://api.spotify.com',
  timeout: 5000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
    const newConfig = config;
    const accessToken = window.localStorage.getItem('access_token');
    if (!accessToken) {
      const error = new Error('No access token was set');
      error.response = { status: 401 };
      return Promise.reject(error);
    }

    newConfig.headers.Authorization = `Bearer ${accessToken}`;
    return newConfig;
  },
  error => Promise.reject(error),
);

instance.interceptors.response.use(
  response => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const redirectUrl = window.location.pathname;
      window.localStorage.setItem('redirect_url', redirectUrl);
      window.location.assign(loginPath);
      return null;
    }

    return Promise.reject(error);
  },
);

export default instance;
