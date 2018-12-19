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
  },

  getters: {
    current: state => state.list
      && (state.list.items.find(playlist => playlist.id === state.id) || null),

    currentTracks: (state, getters) => {
      const { current } = getters;
      return current ? current.tracks : {};
    },
  },
};
