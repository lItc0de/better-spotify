import Vuex from 'vuex';
import clonedeep from 'lodash.clonedeep';
import { createLocalVue } from '@vue/test-utils';

import playlistsStore from './playlistsStore';

jest.mock('@/api');

const localVue = createLocalVue();
localVue.use(Vuex);

describe('playlistsStore', () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store(clonedeep(playlistsStore));
  });

  it('should get playlists and store them ', async () => {
    expect(store.state.list).toEqual({});

    await store.dispatch('fetchList');

    expect(store.state.list).toEqual({ items: [] });
  });
});
