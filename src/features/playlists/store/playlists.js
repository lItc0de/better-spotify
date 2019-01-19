import client from 'utils/client';

export default {
  state: {
    list: null,
    isLoading: false,
    scrollArea: null,
  },

  /* eslint-disable no-param-reassign */
  mutations: {
    setList: (state, playlists) => {
      state.list = playlists;
    },

    pushList(state, { items: newItems, ...meta }) {
      const { items: oldItems } = state.list;
      const list = { items: oldItems.concat(newItems), ...meta };

      state.list = list;
    },

    setLoading: (state, loading) => {
      state.isLoading = loading;
    },

    setScrollArea: (state, scrollArea) => {
      state.scrollArea = scrollArea;
    },
  },
  /* eslint-enable no-param-reassign */

  actions: {
    async fetchList({ commit, dispatch }) {
      commit('setLoading', true);
      const res = await client.get('v1/me/playlists');
      commit('setLoading', false);

      if (!res) return;
      commit('setList', res.data);
      dispatch('handleScroll');
    },

    async fetchNext({ dispatch, commit, getters: { offset } }) {
      const res = await client.get(`v1/me/playlists?offset=${offset}`);
      commit('setLoading', false);

      if (!res) return;
      commit('pushList', res.data);
      dispatch('handleScroll');
    },

    initEndlessScrolling({ dispatch, commit }, scrollArea) {
      commit('setScrollArea', scrollArea);
      scrollArea.$el.addEventListener('scroll', () => dispatch('handleScroll'));
    },

    handleScroll({
      dispatch, state, getters, commit,
    }) {
      const { isLoading, scrollArea } = state;
      const { allLoaded } = getters;

      const bottomVisible = (
        scrollArea ? scrollArea.$el.scrollTop >= (scrollArea.$el.scrollTopMax - 200) : false
      );

      if (isLoading || !bottomVisible || allLoaded) return;
      commit('setLoading', true);
      setTimeout(() => dispatch('fetchNext'), 1000);
    },

    finishLoading({ commit, dispatch }) {
      commit('setLoading', false);
      dispatch('handleScroll');
    },
  },

  getters: {
    offset: state => (state.list ? state.list.items.length : 0),

    items: state => (state.list ? state.list.items : []),

    allLoaded: ({ list }, { offset }) => (list ? list.total <= offset : false),
  },
};
