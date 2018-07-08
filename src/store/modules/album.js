import { fetchFromSpotify } from '@/utils/fetchFromSpotify';

export default {
  state: {
    current: {},
    currentTracks: [],
    albums: [],
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
  },
  /* eslint-enable no-param-reassign */

  actions: {
    async fetchAlbum({ commit }, id) {
      const res = await fetchFromSpotify(`/albums/${id}`);
      if (!res) return;
      commit('setCurrent', res);
    },

    async fetchAlbumTracks({ commit }, id, limit = 100, offset = 0) {
      const res = await fetchFromSpotify(`/albums/${id}/tracks?limit=${limit}&offset=${offset}`);
      if (!res) return;
      commit('setCurrentTracks', res);
    },

    async fetchAlbums({ commit }, ids) {
      const res = await fetchFromSpotify(`/albums?ids=${ids}`);
      if (!res) return;
      commit('setAlbums', res);
    },
  },
};
