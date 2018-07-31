import Frisbee from 'frisbee';
import { redirectBackOrHome } from '@/utils/routerHelper';

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
  `&redirect_uri=${encodeURIComponent('http://localhost:8080/login')}` +
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
        baseURI: 'https://api.spotify.com/v1',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${newAccessToken}`,
          'Content-Type': 'application/json',
        },
      });
      state.accessToken = newAccessToken;
      window.localStorage.setItem('access_token', newAccessToken);
    },
  },
  /* eslint-enable no-param-reassign */

  actions: {
    login({ getters, state, commit }) {
      const { api, accessToken } = state;
      const storedAccessToken = window.localStorage.getItem('access_token');
      if (accessToken && api) return;
      if (storedAccessToken) {
        commit('setApi', storedAccessToken);
        redirectBackOrHome();
        return;
      }

      window.location.assign(getters.loginPath);
    },

    handleFetchError({ getters }, res) {
      switch (res.status) {
        case 401:
          window.location.assign(getters.loginPath);
          break;

        default:
          break;
      }
    },

    setToken({ commit }, accessToken) {
      commit('setApi', accessToken);
      redirectBackOrHome();
    },

    async fetch({ state }, { method, path }) {
      const { api } = state;

      if (!api) return null;

      const res = await state.api[method](path);

      if (res) return res.body;

      return null;
    },
  },

  getters: {
    loginPath() { return loginPath; },
  },
};
