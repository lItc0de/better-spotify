import { fetchFromSpotify, putToSpotify, postToSpotify } from '@/utils/spotifyClient';

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
    shuffle: false,
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

    async postNext() {
      await postToSpotify('/me/player/next');
    },

    async postPrevious() {
      await postToSpotify('/me/player/previous');
    },

    async putPlay(context, options) {
      await putToSpotify('/me/player/play', JSON.stringify(options));
    },

    async putShuffle({ commit }, state) {
      const res = await putToSpotify(`/me/player/shuffle?state=${state}`);
      if (!res) return;
      commit('setShuffle', state);
    },

    async putPlayback(context, deviceId, play = true) {
      await putToSpotify('/me/player', JSON.stringify({ device_id: deviceId, play }));
    },
  },
};
