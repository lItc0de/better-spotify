import client from 'utils/client';

export default {
  state: {
    list: {},
  },

  /* eslint-disable no-param-reassign */
  mutations: {
    setList(state, list) { state.list = list; },

    pushList(state, { items: newItems, ...meta }) {
      const { items: oldItems } = state.list.tracks;
      const tracks = { items: oldItems.concat(newItems), ...meta };

      state.list.tracks = tracks;
    },
  },
  /* eslint-enable no-param-reassign */

  actions: {
    async fetchList({ commit }, playlistId) {
      const res = await client.get(`/v1/playlists/${playlistId}`);

      if (!res) return;
      commit('setList', res.data);
    },

    async fetchTracks({ commit, getters: { offset } }, playlistId) {
      const res = await client.get(`/v1/playlists/${playlistId}/tracks?offset=${offset}`);

      if (!res) return;
      commit('pushList', res.data);
    },
  },

  getters: {
    offset: state => (state.list.tracks ? state.list.tracks.items.length : 0),
  },
};
