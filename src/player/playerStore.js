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

    setPlaying(state, playing) {
      state.playing = playing;
    },

    setShuffle(state, shuffle) {
      state.shuffle = shuffle;
    },

    setRepeat(state, repeat) {
      state.repeat = repeat;
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

    async play({ state, dispatch, commit }, { options, deviceId } = {}) {
      await dispatch('getPlayback');

      if (!state.playback) {
        api.play(options, state.deviceId);
        return;
      }

      if (state.playback.is_playing && !options) {
        const res = await api.pause();
        if (res.status === 204) commit('setPlaying', false);
        return;
      }

      const res = await api.play(options, deviceId);
      if (res.status === 204) commit('setPlaying', true);
    },

    async putShuffle({ dispatch, commit, state }) {
      await dispatch('getPlayback');

      const res = await api.shuffle(!state.shuffle);
      if (res.status === 204) commit('setShuffle', !state.shuffle);
    },

    async putRepeat({ dispatch, commit, state }) {
      await dispatch('getPlayback');

      const repeatStates = ['off', 'context', 'track'];
      const index = repeatStates.indexOf(state.repeat);
      const repeat = repeatStates[index + 1] || 'off';

      const res = await api.repeat(repeat);
      if (res.status === 204) commit('setRepeat', repeat);
    },

    async previous({ dispatch }) {
      await api.previous();
      dispatch('getPlayback');
    },
  },
};
