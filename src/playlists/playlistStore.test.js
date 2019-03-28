import Vuex from 'vuex';
import clonedeep from 'lodash.clonedeep';
import { createLocalVue } from '@vue/test-utils';

import playlistStore from './playlistStore';
import playlist from '@/__mocks__/playlist.json';

jest.mock('@/api');

const localVue = createLocalVue();
localVue.use(Vuex);

describe('playlistStore', () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store(clonedeep(playlistStore));
  });

  it('should fetch a playlist store it', async () => {
    expect(store.state.description).toEqual('');
    expect(store.state.followers).toEqual(null);
    expect(store.state.id).toEqual(null);
    expect(store.state.images).toEqual(null);
    expect(store.state.name).toEqual('');
    expect(store.state.owner).toEqual(null);
    expect(store.state.items).toEqual([]);
    expect(store.state.total).toEqual(null);
    expect(store.state.offset).toEqual(0);

    await store.dispatch('fetchPlaylist');

    expect(store.state.description).toEqual(playlist.description);
    expect(store.state.followers).toEqual(playlist.followers);
    expect(store.state.id).toEqual(playlist.id);
    expect(store.state.images).toEqual(playlist.images);
    expect(store.state.name).toEqual(playlist.name);
    expect(store.state.owner).toEqual(playlist.owner);
    expect(store.state.items).toEqual(playlist.tracks.items);
    expect(store.state.total).toEqual(playlist.tracks.total);
    expect(store.state.offset).toEqual(playlist.tracks.offset);
  });
});
