import axios from 'axios';

const accessToken = 'access-token';

const instance = axios.create({
  baseURL: 'https://api.spotify.com',
  timeout: 1000,
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  },
});

instance.interceptors.response.use(
  response => response,
  (error) => {
    if (error.response.status === 401) {
      window.location.replace('/login');
    }

    return Promise.reject(error);
  },
);

export default instance;
