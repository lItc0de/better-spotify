import { fetchFromSpotify } from '@/utils/fetchFromSpotify';

export default {
  state: {
    current: {},
  },

  /* eslint-disable no-param-reassign */
  mutations: {
    setCurrent(state, current) {
      state.current = current;
    },
  },
  /* eslint-enable no-param-reassign */

  actions: {
    async fetchAlbum({ commit }, id) {
      const res = await fetchFromSpotify(`/albums/${id}`);
      if (!res) return;
      commit('setCurrent', res);
    },
  },
};
