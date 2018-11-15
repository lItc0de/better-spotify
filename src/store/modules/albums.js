export default {
  state: {
    current: null,
    currentTracks: [],
    albums: [],
    myAlbums: [],
  },

  /* eslint-disable no-param-reassign */
  mutations: {
    setCurrent(state, current) {
      state.current = current;
    },

    setCurrentTracks(state, currentTracks) {
      state.currentTracks = currentTracks;
    },

    setAlbums(state, albums) {
      state.albums = albums;
    },

    setMyAlbums(state, albums) {
      state.myAlbums = albums;
    },
  },
  /* eslint-enable no-param-reassign */

  actions: {
    async fetchAlbum({ commit, dispatch }, id) {
      const res = await dispatch('client/fetch', {
        path: `/albums/${id}`,
        method: 'get',
      }, { root: true });
      if (!res) return;
      commit('setCurrent', res);
    },

    async fetchAlbumTracks({ commit, dispatch }, id, limit = 100, offset = 0) {
      const res = await dispatch('client/fetch', {
        path: `/albums/${id}/tracks?limit=${limit}&offset=${offset}`,
        method: 'get',
      }, { root: true });
      if (!res) return;
      commit('setCurrentTracks', res);
    },

    async fetchAlbums({ commit, dispatch }, ids) {
      const res = await dispatch('client/fetch', {
        path: `/albums?ids=${ids}`,
        method: 'get',
      }, { root: true });
      if (!res) return;
      commit('setAlbums', res.albums);
    },

    async fetchMyAlbums({ commit, dispatch }, { limit, offset }) {
      const res = await dispatch('client/fetch', {
        path: `/me/albums?limit=${limit}&offset=${offset}`,
        method: 'get',
      }, { root: true });
      if (!res) return;
      commit('setMyAlbums', res.items);
    },
  },
};
