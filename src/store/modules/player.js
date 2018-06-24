import fetchFromSpotify from '@/utils/fetchFromSpotify';

export default {
  state: {
    devices: [],
    playback: {},
    history: [],
    currentTrack: {},
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
  },
  /* eslint-enabel no-param-reassign */

  actions: {
    async fetchDevices({ commit }) {
      const res = await fetchFromSpotify('/me/player/devices');
      if (!res) return;
      commit('setDevices', res);
    },

    async fetchPlayback({ commit }) {
      const res = await fetchFromSpotify('/me/player');
      if (!res) return;
      commit('setPlayback', res);
    },

    async fetchHistory({ commit }) {
      const res = await fetchFromSpotify('/me/player/recently-played');
      if (!res) return;
      commit('setHistory', res);
    },

    async fetchCurrentTrack({ commit }) {
      const res = await fetchFromSpotify('/me/player/currently-playing');
      if (!res) return;
      commit('setCurrentTrack', res);
    },
  },
};
