export default {
  state: {
    devices: [],
    playback: null,
    history: [],
    currentTrack: null,
    playing: false,
    seek: 0,
    repeat: 'off',
    volume: 100,
    shuffle: false,
    player: null,
    deviceId: '',
    WebPlaybackState: null,
  },

  /* eslint-disable no-param-reassign */
  mutations: {
    setDevices(state, devices) {
      state.devices = devices;
    },

    setPlayback(state, playback) {
      state.playback = playback;
    },

    setHistory(state, history) {
      state.history = history;
    },

    setCurrentTrack(state, currentTrack) {
      state.currentTrack = currentTrack;
    },

    setPause(state) {
      state.playing = false;
    },

    setSeek(state, ms) {
      state.seek = ms;
    },

    setRepeat(state, repeat) {
      state.repeat = repeat;
    },

    setVolume(state, volume) {
      state.volume = volume;
    },

    setShuffle(state, shuffle) {
      state.shuffle = shuffle;
    },

    setPlayer(state, player) {
      state.player = player;
    },

    setDeviceId(state, deviceId) {
      state.deviceId = deviceId;
    },

    setWebPlaybackState(state, WebPlaybackState) {
      state.WebPlaybackState = WebPlaybackState;
    },
  },
  /* eslint-enabel no-param-reassign */

  actions: {
    async fetchDevices({ commit, dispatch }) {
      const res = await dispatch('client/fetch', {
        path: '/me/player/devices',
        method: 'get',
      }, { root: true });
      if (!res) return;
      commit('setDevices', res);
    },

    async fetchPlayback({ commit, dispatch }) {
      const res = await dispatch('client/fetch', {
        path: '/me/player',
        method: 'get',
      }, { root: true });
      if (!res) return;
      commit('setPlayback', res);
    },

    async fetchHistory({ commit, dispatch }) {
      const res = await dispatch('client/fetch', {
        path: '/me/player/recently-played',
        method: 'get',
      }, { root: true });
      if (!res) return;
      commit('setHistory', res);
    },

    async fetchCurrentTrack({ commit, dispatch }) {
      const res = await dispatch('client/fetch', {
        path: '/me/player/currently-playing',
        method: 'get',
      }, { root: true });
      if (!res) return;
      commit('setCurrentTrack', res);
    },

    async putPause({ commit, dispatch }) {
      const res = await dispatch('client/fetch', {
        path: '/me/player/pause',
        method: 'put',
      }, { root: true });
      if (!res) return;
      commit('setPause');
    },

    async putSeek({ commit, dispatch }, seek = 0) {
      const res = await dispatch('client/fetch', {
        path: `/me/player/seek?position_ms=${seek}`,
        method: 'put',
      }, { root: true });
      if (!res) return;
      commit('setSeek', seek);
    },

    async putRepeat({ commit, dispatch }, repeat = 'off') {
      const res = await dispatch('client/fetch', {
        path: `/me/player/repeat?state=${repeat}`,
        method: 'put',
      }, { root: true });
      if (!res) return;
      commit('setRepeat', repeat);
    },

    repeatOff({ dispatch }) {
      dispatch('putRepeat', 'off');
    },

    repeatTrack({ dispatch }) {
      dispatch('putRepeat', 'track');
    },

    repeatContext({ dispatch }) {
      dispatch('putRepeat', 'context');
    },

    async putVolume({ commit, dispatch }, volume = 100) {
      if (volume > 100) volume = 100;
      const res = await dispatch('client/fetch', {
        path: `/me/player/volume?volume_percent=${volume}`,
        method: 'put',
      }, { root: true });
      if (!res) return;
      commit('setVolume', volume);
    },

    async postNext({ dispatch }) {
      await dispatch('client/fetch', {
        path: '/me/player/next',
        method: 'post',
      }, { root: true });
    },

    async postPrevious({ dispatch }) {
      await dispatch('client/fetch', {
        path: '/me/player/previous',
        method: 'post',
      }, { root: true });
    },

    async putPlay({ dispatch }, options) {
      await dispatch('client/fetch', {
        path: '/me/player/play',
        method: 'put',
      }, JSON.stringify(options), { root: true });
    },

    async putShuffle({ commit, dispatch }, state) {
      const res = await dispatch('client/fetch', {
        path: `/me/player/shuffle?state=${state}`,
        method: 'put',
      }, { root: true });
      if (!res) return;
      commit('setShuffle', state);
    },

    async putPlayback({ dispatch }, deviceId, play = true) {
      await dispatch('client/fetch', {
        path: '/me/player',
        method: 'put',
        body: JSON.stringify({ device_ids: [deviceId], play }),
      }, { root: true });
    },

    togglePlay({ state }) {
      const { player } = state;
      if (player) player.togglePlay();
    },

    createPlayer({ commit, dispatch }, accessToken) {
      if (!accessToken) return;

      const player = new window.Spotify.Player({
        name: 'Better Spotify',
        getOAuthToken: (cb) => { cb(accessToken); },
      });

      player.addListener('ready', ({ device_id: deviceId }) => {
        commit('setDeviceId', deviceId);
      });

      player.addListener('not_ready', ({ device_id: deviceId }) => {
        console.log('Device ID is not ready for playback', deviceId);
      });

      player.addListener('player_state_changed', WebPlaybackState =>
        commit('setWebPlaybackState', WebPlaybackState));

      player.connect().then((success) => {
        if (success) {
          player.getCurrentState().then((state) => {
            if (!state) {
              console.error('User is not playing music through the Web Playback SDK');
              dispatch('fetchPlayback');
              return;
            }

            const {
              current_track: currentTrack,
              next_tracks: [nextTrack],
            } = state.track_window;

            console.log('Currently Playing', currentTrack);
            console.log('Playing Next', nextTrack);
          });
        }
      });

      dispatch('handlePlayerErrors', player);

      commit('setPlayer', player);
    },

    handlePlayerErrors(context, player) {
      player.on('initialization_error', ({ message }) => {
        console.error('Failed to initialize', message);
      });

      player.on('authentication_error', ({ message }) => {
        console.error('Failed to authenticate', message);
      });

      player.on('account_error', ({ message }) => {
        console.error('Failed to validate Spotify account', message);
      });

      player.on('playback_error', ({ message }) => {
        console.error('Failed to perform playback', message);
      });
    },
  },
};
