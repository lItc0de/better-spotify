import Vuex from 'vuex';
import clonedeep from 'lodash.clonedeep';
import { createLocalVue } from '@vue/test-utils';

import playlistsStore from './playlistsStore';
import playlists from '@/__mocks__/playlists.json';

jest.mock('@/api');

const localVue = createLocalVue();
localVue.use(Vuex);

describe('playlistsStore', () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store(clonedeep(playlistsStore));
  });

  it('should get playlists and store them ', async () => {
    expect(store.state.items).toEqual([]);
    expect(store.state.limit).toEqual(null);
    expect(store.state.offset).toEqual(0);
    expect(store.state.total).toEqual(null);

    await store.dispatch('fetchList');

    expect(store.state.items).toEqual(playlists.items);
    expect(store.state.limit).toEqual(2);
    expect(store.state.offset).toEqual(2);
    expect(store.state.total).toEqual(4);
  });
});
