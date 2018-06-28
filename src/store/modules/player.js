import { fetchFromSpotify, putToSpotify } from '@/utils/fetchFromSpotify';

export default {
  state: {
    devices: [],
    playback: {},
    history: [],
    currentTrack: {},
    playing: false,
    seek: 0,
    repeat: 'off',
    volume: 100,
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

    async putPause({ commit }) {
      const res = await putToSpotify('/me/player/pause');
      if (!res) return;
      commit('setPause');
    },

    async putSeek({ commit }, seek = 0) {
      const res = await putToSpotify(`/me/player/seek?position_ms=${seek}`);
      if (!res) return;
      commit('setSeek', seek);
    },

    async putRepeat({ commit }, repeat = 'off') {
      const res = await putToSpotify(`/me/player/repeat?state=${repeat}`);
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

    async putVolume({ commit }, volume = 100) {
      if (volume > 100) volume = 100;
      const res = await putToSpotify(`/me/player/volume?volume_percent=${volume}`);
      if (!res) return;
      commit('setVolume', volume);
    },
  },
};
