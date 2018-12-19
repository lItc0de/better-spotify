export default {
  state: {
    myArtists: [],
    artists: [],
    images: [],
    current: null,
    currentTracks: [],
  },

  /* eslint-disable no-param-reassign */
  mutations: {
    setMyArtists(state, artists) {
      state.myArtists = artists;
    },

    setArtists(state, artists) {
      state.artists = artists;
    },

    setImages(state, images) {
      state.images = images;
    },

    setCurrent(state, artist) {
      state.current = artist;
    },

    setCurrentTracks(state, tracks) {
      state.currentTracks = tracks;
    },
  },
  /* eslint-enable no-param-reassign */

  actions: {
    async fetchArtist({ commit, dispatch }, artistId) {
      const res = await dispatch('client/fetch', {
        path: `/artists/${artistId}`,
        method: 'get',
      }, { root: true });
      if (!res) return;
      commit('setCurrent', res);
    },
  },

  getters: {

  },
};
