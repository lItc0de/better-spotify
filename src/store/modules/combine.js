export default {
  state: {

  },

  mutations: {

  },

  actions: {
    toggleRepeatMode({ dispatch, rootGetters }) {
      switch (rootGetters['playback/repeatMode']) {
        case 'off':
          dispatch('player/putRepeat', 'context', { root: true });
          break;
        case 'context':
          dispatch('player/putRepeat', 'track', { root: true });
          break;
        default:
          dispatch('player/putRepeat', 'off', { root: true });
          break;
      }
    },

    toggleShuffle({ dispatch, rootGetters }) {
      const shuffle = rootGetters['playback/shuffle'];
      dispatch('player/putShuffle', !shuffle, { root: true });
    },

    togglePlay({ dispatch, getters }) {
      const { hasPlayback, paused } = getters;
      if (hasPlayback) dispatch('playback/togglePlay', null, { root: true });
      else dispatch(paused ? 'player/putPlay' : 'player/putPause', null, { root: true });
    },

    seek({ dispatch, getters }, position) {
      if (getters.hasPlayback) dispatch('playback/seek', position, { root: true });
      else dispatch('player/putSeek', position, { root: true });
    },

    nextTrack({ dispatch, getters }) {
      if (getters.hasPlayback) dispatch('playback/nextTrack', null, { root: true });
      else dispatch('player/postNext', null, { root: true });
    },

    previousTrack({ dispatch, getters }) {
      if (getters.hasPlayback) dispatch('playback/previousTrack', null, { root: true });
      else dispatch('player/postPrevious', null, { root: true });
    },

    putPlayback({ dispatch, getters }, { deviceId, play }) {
      const ownDeviceId = getters.deviceId;
      const options = { deviceId: deviceId || ownDeviceId, play };
      dispatch('player/putPlayback', options, { root: true });
    },
  },

  getters: {
    hasPlayback(state, getters, rootState) {
      return rootState['playback/ready'];
    },

    paused(state, getters, rootState, rootGetters) {
      return rootGetters['playback/paused'];
    },

    deviceId() {
      return undefined;
    },
  },
};
