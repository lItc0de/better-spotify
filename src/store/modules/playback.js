export default {
  state: {
    WebPlaybackPlayer: null,
    WebPlaybackState: null,
    WebPlaybackError: null,
    deviceId: '',
    ready: false,
  },

  /* eslint-disable no-param-reassign */
  mutations: {
    setWebPlaybackPlayer(state, WebPlaybackPlayer) {
      state.WebPlaybackPlayer = WebPlaybackPlayer || null;
    },

    setWebPlaybackState(state, WebPlaybackState) {
      state.WebPlaybackState = WebPlaybackState || null;

      const {
        current_track: currentTrack,
        next_tracks: [nextTrack],
      } = WebPlaybackState.track_window;

      console.log('Currently Playing', currentTrack);
      console.log('Playing Next', nextTrack);
    },

    setDeviveId(state, deviceId) {
      state.deviceId = deviceId;
      console.log('deviceId', deviceId);
    },

    setReady(state, ready) {
      state.ready = ready;
    },
  },
  /* eslint-enable no-param-reassign */

  actions: {
    intitializeSDK({ state, commit, dispatch }, accessToken) {
      if (!accessToken) return;

      const WebPlaybackPlayer = new window.Spotify.Player({
        name: 'Better Spotify',
        getOAuthToken: (cb) => { cb(accessToken); },
      });

      commit('setWebPlaybackPlayer', WebPlaybackPlayer);

      if (state.WebPlaybackPlayer) {
        // Events
        dispatch('addListenerReady');
        dispatch('addListenerNotReady');
        dispatch('addListenerPlayerStateChanged');

        // Errors
        dispatch('handleInitializationError');
        dispatch('handleAuthenticationError');
        dispatch('handleAccountError');
        dispatch('handlePlaybackError');

        // Connect
        dispatch('connect');
      }
    },

    connect({ state, dispatch }) {
      const { WebPlaybackPlayer } = state;

      WebPlaybackPlayer.connect().then((success) => {
        if (success) dispatch('getCurrentState');
      });
    },

    getCurrentState({ state, commit }) {
      const { ready, WebPlaybackPlayer } = state;
      if (!ready) return;
      WebPlaybackPlayer.getCurrentState().then((WebPlaybackState) => {
        if (!WebPlaybackState) {
          console.error('User is not playing music through the Web Playback SDK');
          return;
        }

        commit('setWebPlaybackState', WebPlaybackState);
      });
    },

    pause({ state }) {
      const { ready, WebPlaybackPlayer } = state;
      if (!ready) return;
      WebPlaybackPlayer.pause().then((() => {
        console.log('pause');
      }));
    },

    resume({ state }) {
      const { ready, WebPlaybackPlayer } = state;
      if (!ready) return;
      WebPlaybackPlayer.resume().then((() => {
        console.log('resume');
      }));
    },

    togglePlay({ state }) {
      const { ready, WebPlaybackPlayer } = state;
      if (!ready) return;
      WebPlaybackPlayer.togglePlay().then((() => {
        console.log('togglePlay');
      }));
    },

    seek({ state }, position) {
      const { ready, WebPlaybackPlayer } = state;
      if (!ready) return;
      WebPlaybackPlayer.seek(position).then((() => {
        console.log('seek', position);
      }));
    },

    previousTrack({ state }) {
      const { ready, WebPlaybackPlayer } = state;
      if (!ready) return;
      WebPlaybackPlayer.previousTrack().then((() => {
        console.log('previousTrack');
      }));
    },

    nextTrack({ state }) {
      const { ready, WebPlaybackPlayer } = state;
      if (!ready) return;
      WebPlaybackPlayer.nextTrack().then((() => {
        console.log('nextTrack');
      }));
    },

    // Events
    addListenerReady({ state, commit }) {
      state.WebPlaybackPlayer.addListener('ready', ({ device_id: deviceId }) => {
        commit('setDeviveId', deviceId);
        commit('setReady', true);
      });
    },

    addListenerNotReady({ state, commit }) {
      state.WebPlaybackPlayer.addListener('ready', () => {
        commit('setReady', false);
      });
    },

    addListenerPlayerStateChanged({ state, commit }) {
      state.WebPlaybackPlayer.addListener('player_state_changed', (WebPlaybackState) => {
        commit('setWebPlaybackState', WebPlaybackState);
        commit('setReady', !!WebPlaybackState);
      });
    },

    // Errors
    handleInitializationError({ state }) {
      state.WebPlaybackPlayer.on('initialization_error', ({ message }) => {
        console.error('Failed to initialize', message);
      });
    },

    handleAuthenticationError({ state }) {
      state.WebPlaybackPlayer.on('authentication_error', ({ message }) => {
        console.error('Failed to authenticate', message);
      });
    },

    handleAccountError({ state }) {
      state.WebPlaybackPlayer.on('account_error', ({ message }) => {
        console.error('Failed to validate Spotify account', message);
      });
    },

    handlePlaybackError({ state }) {
      state.WebPlaybackPlayer.on('playback_error', ({ message }) => {
        console.error('Failed to perform playback', message);
      });
    },
  },

  getters: {
    WebPlaybackTrack(state) {
      const { WebPlaybackState } = state;
      return WebPlaybackState ? WebPlaybackState.track_window.current_track : null;
    },

    connected(state) {
      return !!state.WebPlaybackPlayer;
    },

    paused(state) {
      const { WebPlaybackState } = state;
      return WebPlaybackState ? WebPlaybackState.paused : true;
    },

    position(state) {
      const { WebPlaybackState } = state;
      return WebPlaybackState ? WebPlaybackState.position : 0;
    },

    repeatMode(state) {
      const { WebPlaybackState } = state;
      return WebPlaybackState ? WebPlaybackState.repeat_mode : 0;
    },

    shuffle(state) {
      const { WebPlaybackState } = state;
      return WebPlaybackState ? WebPlaybackState.shuffle : false;
    },
  },
};
