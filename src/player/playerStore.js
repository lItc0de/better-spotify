import api from '@/api';

export default {
  state: {
    player: null,
    deviceId: null,
    playingDeviceId: null,
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
      if (!playback) return;
      state.playingDeviceId = playback.device.id;
      state.playing = playback.is_playing;
      state.progress = playback.progress_ms;
      state.shuffle = playback.shuffle_state;
      state.repeat = playback.repeat_state;
      state.track = playback.item;
    },

    setWebPlayback(state, webPlayback) {
      const repeatModes = ['off', 'context', 'track'];
      if (!webPlayback) {
        state.playingDeviceId = null;
        return;
      }
      state.playingDeviceId = state.deviceId;
      state.playing = !webPlayback.paused;
      state.progress = webPlayback.position;
      state.shuffle = webPlayback.shuffle;
      state.repeat = repeatModes[webPlayback.repeat_mode];
      state.track = webPlayback.track_window.current_track;
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
    async createPlayer({ commit }) {
      const token = window.localStorage.getItem('access_token');

      // eslint-disable-next-line no-undef
      const player = new Spotify.Player({
        name: 'Better Spotify',
        getOAuthToken: (cb) => { cb(token); },
      });

      player.addListener('ready', p => commit('setDeviceId', p.device_id));

      player.addListener('player_state_changed', webPlayback => commit('setWebPlayback', webPlayback));

      player.connect();


      const webPlayback = await player.getCurrentState();

      commit('setWebPlayback', webPlayback);
      commit('setPlayer', player);
    },

    async getPlayback({ commit }) {
      const res = await api.getPlayback();

      commit('setPlayback', res.data);
    },

    async play({ state, dispatch, commit }, { options, deviceId } = {}) {
      await dispatch('getPlayback');

      if (!state.playingDeviceId) {
        api.play(options, state.deviceId);
        return;
      }

      if (state.playing && !options) {
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
      setTimeout(() => dispatch('getPlayback'), 200);
    },

    async next({ dispatch }) {
      await api.next();
      await setTimeout(() => dispatch('getPlayback'), 200);
    },
  },
};
