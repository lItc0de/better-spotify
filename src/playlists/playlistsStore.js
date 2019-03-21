import api from '@/api';

export default {
  state: {
    list: {},
  },

  /* eslint-disable no-param-reassign */
  mutations: {
    setList(state, list) {
      state.list = list;
    },
  },
  /* eslint-enable no-param-reassign */

  actions: {
    async fetchList({ commit }) {
      const res = await api.getPlaylists();

      if (!res) return;
      commit('setList', res.data);
    },
  },
};
