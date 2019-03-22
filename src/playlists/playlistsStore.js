import api from '@/api';

export default {
  state: {
    items: [],
    limit: null,
    offset: 0,
    total: null,
  },

  /* eslint-disable no-param-reassign */
  mutations: {
    setItems(state, items) {
      state.items = items;
    },

    setLimit(state, limit) {
      state.limit = limit;
    },

    setOffset(state, offset) {
      state.offset = offset;
    },

    setTotal(state, total) {
      state.total = total;
    },
  },
  /* eslint-enable no-param-reassign */

  actions: {
    async fetchPlaylists({ commit }) {
      const res = await api.getPlaylists();

      if (!res) return;
      commit('setItems', res.data.items);
      commit('setLimit', res.data.limit);
      commit('setOffset', res.data.offset);
      commit('setTotal', res.data.total);
    },
  },
};
