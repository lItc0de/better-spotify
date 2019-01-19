import Vuex from 'vuex';
import cloneDeep from 'lodash.clonedeep';
import MockAdapter from 'axios-mock-adapter';
import { createLocalVue } from '@vue/test-utils';
import client from 'utils/client';

import playlistMock from '../../__mocks__/playlist.json';
import newTracksMock from '../../__mocks__/newTracks.json';
import playlistNewTracksMock from '../../__mocks__/playlistNewTracks.json';

import storeConfig from '@/store/config';

const mock = new MockAdapter(client);

const localVue = createLocalVue();
localVue.use(Vuex);

const getPlaylistMock = () => cloneDeep(playlistMock);
const getNewTracks = () => cloneDeep(newTracksMock);
const getPlaylistNewTracks = () => cloneDeep(playlistNewTracksMock);

describe('playlist module', () => {
  let store;

  beforeEach(() => {
    const config = cloneDeep(storeConfig);
    store = new Vuex.Store(config);
  });

  describe('mutations', () => {
    describe('setList', () => {
      it('fills the list with the passed items', () => {
        const playlist = getPlaylistMock();
        expect(store.state.playlist.list).toEqual({});

        store.commit('playlist/setList', playlist);
        expect(store.state.playlist.list).toEqual(playlist);
      });
    });

    describe('pushList', () => {
      it('adds passed items to the list', () => {
        const playlist = getPlaylistMock();
        const newTracks = getNewTracks();
        const playlistNewTracks = getPlaylistNewTracks();
        store.state.playlist.list = playlist;

        store.commit('playlist/pushList', newTracks);
        expect(store.state.playlist.list).toEqual(playlistNewTracks);
      });
    });
  });

  describe('actions', () => {
    beforeAll(() => {
      window.localStorage.setItem('access_token', 'access_token');
    });

    afterAll(() => {
      window.localStorage.removeItem('access_token');
    });

    describe('fetchList', () => {
      it('fetches the list from api and calls setList', async () => {
        const playlist = getPlaylistMock();
        const playlistId = '50L3W8NaVU3d4bKlCPi6I9';
        mock.onGet(`/v1/playlists/${playlistId}`).reply(200, playlist);
        store.commit = jest.fn();

        await store.dispatch('playlist/fetchList', playlistId);
        expect(store.commit).toHaveBeenCalledWith('playlist/setList', playlist, undefined);
      });
    });

    describe('fetchTracks', () => {
      it('fetches the next tracks from api and calls pushList', async () => {
        const newTracks = getNewTracks();
        const playlistId = '50L3W8NaVU3d4bKlCPi6I9';
        const playlist = getPlaylistMock();
        store.state.playlist.list = playlist;
        mock.onGet(`/v1/playlists/${playlistId}/tracks?offset=2`).reply(200, newTracks);
        store.commit = jest.fn();

        await store.dispatch('playlist/fetchTracks', playlistId);
        expect(store.commit).toHaveBeenCalledWith('playlist/pushList', newTracks, undefined);
      });
    });
  });


  describe('getters', () => {
    describe('offset', () => {
      it('returns the offset of the playlist tracks', () => {
        const playlist = getPlaylistMock();
        store.state.playlist.list = playlist;

        expect(store.getters['playlist/offset']).toEqual(2);
      });
    });
  });
});
