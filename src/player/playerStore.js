import api from '@/api';

export default {
  state: {
    player: null,
    deviceId: null,
    playback: null,
    playing: false,
    progress: null,
    shuffle: false,
    repeat: 'off',
    track: null,
  },

  /* eslint-disable no-param-reassign */
  mutations: {
    setPlayer(state, player) {
      state.player = player;
    },

    setDeviceId(state, deviceId) {
      state.deviceId = deviceId;
    },

    setPlayback(state, playback) {
      state.playback = playback;
      if (!playback) return;
      state.playing = playback.is_playing;
      state.progress = playback.progress_ms;
      state.shuffle = playback.shuffle_state;
      state.repeat = playback.repeat_state;
      state.track = playback.item;
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

      player.addListener('ready', params => commit('setDeviceId', params.device_id));

      player.connect();

      commit('setPlayer', player);
    },

    async getPlayback({ commit }) {
      const res = await api.getPlayback();

      commit('setPlayback', res.data);
    },

    async play({ state, dispatch }, { options, deviceId } = {}) {
      await dispatch('getPlayback');

      if (!state.playback) {
        api.play(options, state.deviceId);
        return;
      }

      if (state.playback.is_playing && !options) {
        api.pause();
        return;
      }

      api.play(options, deviceId);
    },
  },
};
