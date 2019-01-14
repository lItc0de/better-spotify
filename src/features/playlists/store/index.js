import client from 'utils/client';
import mergeItems from 'utils/mergeItems';

export default {
  state: {
    list: null,
    id: null,
    loading: false,
  },

  /* eslint-disable no-param-reassign */
  mutations: {
    setId: (state, id) => { state.id = id; },

    setLoading: (state, loading) => { if (typeof loading === 'boolean') state.loading = loading; },

    setList: (state, playlists) => {
      state.list = playlists;
    },

    pushList: (state, playlists) => {
      const newItems = playlists.items;
      if (!(newItems instanceof Array)) return;

      if (state.list) {
        const existingItems = state.list.items;
        const mergedItems = mergeItems(existingItems, newItems);
        playlists.items = mergedItems;
      }

      state.list = playlists;
    },

    setTracks: (state, tracks) => {
      const playlist = state.list.items.find(p => p.id === state.id);
      playlist.tracks = tracks;
    },

    pushTracks: (state, tracks) => {
      const newItems = tracks.items;
      if (!(newItems instanceof Array)) return;

      const playlist = state.list.items.find(p => p.id === state.id);

      if (playlist.tracks.items) {
        const existingItems = playlist.tracks.items;
        const mergedItems = mergeItems(existingItems, newItems);
        tracks.items = mergedItems;
      }

      playlist.tracks = tracks;
    },
  },
  /* eslint-enable no-param-reassign */

  actions: {
    async fetchList({ commit }) {
      const res = await client.get('v1/me/playlists');

      if (!res) return;
      commit('setList', res.data);
    },

    async fetchNext({ commit, getters, state }) {
      if (!state.list || state.list.total === getters.listCount) return false;
      const res = await client.get(`v1/me/playlists?offset=${getters.listCount}`);

      if (!res) return false;
      commit('pushList', res.data);
      return true;
    },

    async fetchTracks({ commit, state }) {
      if (!state.id) return;
      const res = await client.get(`v1/playlists/${state.id}`);

      if (!res) return;
      commit('setTracks', res.data);
    },

    async fetchNextTracks({ commit, state, getters }) {
      if (!state.id) return;
      const res = await client.get(`v1/playlists/${state.id}?offset=${getters.tracksCount}`);

      if (!res) return;
      commit('pushTracks', res.data);
    },
  },

  getters: {
    current: state => state.list
      && (state.list.items.find(playlist => playlist.id === state.id) || null),

    currentTracks: (state, getters) => {
      const { current } = getters;
      return current ? current.tracks : {};
    },

    items: state => (state.list ? state.list.items : []),

    listCount: state => (state.list ? state.list.items.length : 0),

    tracksCount: (state, getters) => (getters.current ? getters.current.tracks.items.length : 0),
  },
};
