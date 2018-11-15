export default {
  state: {
    myPlaylists: [],
    playlists: [],
    images: [],
    current: null,
    currentTracks: [],
  },

  /* eslint-disable no-param-reassign */
  mutations: {
    setMyPlaylists(state, playlists) {
      state.myPlaylists = playlists;
    },

    setPlaylists(state, playlists) {
      state.playlists = playlists;
    },

    setImages(state, images) {
      state.images = images;
    },

    setCurrent(state, playlist) {
      state.current = playlist;
    },

    setCurrentTracks(state, tracks) {
      state.currentTracks = tracks;
    },
  },
  /* eslint-enable no-param-reassign */

  actions: {
    async addTracks({ dispatch }, { playlistId, tracks }) {
      await dispatch('client/fetch', {
        path: `/playlists/${playlistId}/tracks`,
        method: 'post',
        body: JSON.stringify({ uris: tracks || [] }),
      }, { root: true });
    },

    async changeDetails({ dispatch }, { playlistId, details }) {
      await dispatch('client/fetch', {
        path: `/playlists/${playlistId}`,
        method: 'put',
        body: JSON.stringify(details || {}),
      }, { root: true });
    },

    async createPlaylist({ dispatch }, { userId, details }) {
      await dispatch('client/fetch', {
        path: `/playlists/user/${userId}/playlists`,
        method: 'post',
        body: JSON.stringify(details || {}),
      }, { root: true });
    },

    async fetchMyPlaylists({ dispatch, commit }, { limit, offset }) {
      const res = await dispatch('client/fetch', {
        path: `/me/playlists?limit=${limit}&offset=${offset}`,
        method: 'get',
      }, { root: true });
      if (!res) return;
      commit('setMyPlaylists', res.items);
    },

    async fetchPlaylists({ dispatch, commit }, { userId, limit, offset }) {
      const res = await dispatch('client/fetch', {
        path: `/users/${userId}/playlists?limit=${limit}&offset=${offset}`,
        method: 'get',
      }, { root: true });
      if (!res) return;
      commit('setPlaylists', res);
    },

    async getCoverImage({ dispatch, commit }, { playlistId }) {
      const res = await dispatch('client/fetch', {
        path: `/playlists/${playlistId}/images`,
        method: 'get',
      }, { root: true });
      if (!res) return;
      commit('setImages', res);
    },

    async fetchPlaylist({ commit, dispatch }, playlistId) {
      const res = await dispatch('client/fetch', {
        path: `/playlists/${playlistId}`,
        method: 'get',
      }, { root: true });
      if (!res) return;
      commit('setCurrent', res);
    },

    async fetchPlaylistTracks({ commit, dispatch }, { playlistId, limit, offset }) {
      const res = await dispatch('client/fetch', {
        path: `/playlists/${playlistId}/tracks?limit=${limit}&offset=${offset}`,
        method: 'get',
      }, { root: true });
      if (!res) return;
      commit('setCurrentTracks', res.items);
    },
  },

  getters: {

  },
};
