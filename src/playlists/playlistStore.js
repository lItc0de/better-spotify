import api from '@/api';

export default {
  state: {
    description: '',
    followers: null,
    id: null,
    images: null,
    name: '',
    owner: null,
    items: [],
    total: null,
    offset: 0,
    uri: null,
  },

  /* eslint-disable no-param-reassign */
  mutations: {
    setDescription(state, description) {
      state.description = description;
    },

    setFollowers(state, followers) {
      state.followers = followers;
    },

    setId(state, id) {
      state.id = id;
    },

    setImages(state, images) {
      state.images = images;
    },

    setName(state, name) {
      state.name = name;
    },

    setOwner(state, owner) {
      state.owner = owner;
    },

    setTracks(state, tracks) {
      state.items = tracks.items;
      state.total = tracks.total;
      state.offset = tracks.offset;
    },

    setUri(state, uri) {
      state.uri = uri;
    },
  },
  /* eslint-enable no-param-reassign */

  actions: {
    async fetchPlaylist({ commit }, playlistId) {
      const res = await api.getPlaylist(playlistId);

      if (!res) return;
      commit('setDescription', res.data.description);
      commit('setFollowers', res.data.followers);
      commit('setId', res.data.id);
      commit('setImages', res.data.images);
      commit('setName', res.data.name);
      commit('setOwner', res.data.owner);
      commit('setTracks', res.data.tracks);
      commit('setUri', res.data.uri);
    },
  },
};
