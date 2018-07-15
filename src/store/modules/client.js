import Frisbee from 'frisbee';
import router from '@/routes';

const scopes = encodeURIComponent([
  'playlist-read-private',
  'streaming',
  'user-read-birthdate',
  'user-read-email',
  'user-read-private',
].join(' '));

const loginPath = 'https://accounts.spotify.com/authorize' +
  '?client_id=5c4aeb1c4e8f495fa3ba5e13916eb3f4' +
  '&response_type=token' +
  `&redirect_uri=${encodeURIComponent('http://localhost:8080/authorize')}` +
  '&state=123' +
  `&scope=${scopes}`;

export default {
  state: {
    api: null,
    accessToken: '',
  },

  /* eslint-disable no-param-reassign */
  mutations: {
    setApi(state, newAccessToken) {
      const { accessToken } = state;
      if (!newAccessToken) return;
      if (newAccessToken === accessToken) return;

      state.api = new Frisbee({
        baseUri: 'https://api.spotify.com/v1',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${newAccessToken}`,
          'Content-Type': 'application/json',
        },
      });
      state.accessToken = newAccessToken;
    },
  },
  /* eslint-enable no-param-reassign */

  actions: {
    login({ getters, state }) {
      const { api, accessToken } = state;
      if (accessToken && api) return;
      router.push(getters.loginPath);
    },

    handleFetchError({ getters }, res) {
      switch (res.status) {
        case 401:
          router.push(getters.loginPath);
          break;

        default:
          break;
      }
    },
  },

  getters: {
    loginPath() { return loginPath; },
  },
};
