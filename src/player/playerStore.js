export default {
  state: {
    player: null,
  },

  /* eslint-disable no-param-reassign */
  mutations: {
    setPlayer(state, player) {
      state.player = player;
    },
  },
  /* eslint-enable no-param-reassign */

  actions: {
    createPlayer({ commit }) {
      const token = window.localStorage.getItem('access_token');

      // eslint-disable-next-line no-undef
      const player = new Spotify.Player({
        name: 'Better Spotify',
        getOAuthToken: (cb) => { cb(token); },
      });

      player.connect();

      commit('setPlayer', player);
    },
  },
};
