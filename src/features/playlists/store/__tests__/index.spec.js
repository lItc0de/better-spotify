import Vuex from 'vuex';
import cloneDeep from 'lodash.clonedeep';
import MockAdapter from 'axios-mock-adapter';
import { createLocalVue } from '@vue/test-utils';
import client from 'utils/client';
import storeConfig from '@/store/config';
import playlistsMock from '@/__mocks__/playlists.json';
import tracksMock from '@/__mocks__/tracks.json';

const mock = new MockAdapter(client);

const localVue = createLocalVue();
localVue.use(Vuex);

describe('playlists module', () => {
  let store;
  let playlists;
  let tracks;

  beforeEach(() => {
    const config = cloneDeep(storeConfig);
    store = new Vuex.Store(config);
    playlists = cloneDeep(playlistsMock);
    tracks = cloneDeep(tracksMock);
  });

  describe('mutations', () => {
    describe('setId', () => {
      it('sets the playlist id', () => {
        store.commit('playlists/setId', '123');
        expect(store.state.playlists.id).toEqual('123');
      });
    });

    describe('setLoading', () => {
      it('sets the loading state', () => {
        store.commit('playlists/setLoading', true);
        expect(store.state.playlists.loading).toBe(true);
      });

      it('only accepts boolean', () => {
        store.commit('playlists/setLoading', 'asdfas');
        expect(store.state.playlists.loading).toBe(false);
      });
    });

    describe('setPlaylists', () => {
      it('adds new playlists to the list array', () => {
        store.commit('playlists/setList', playlists);
        expect(store.state.playlists.list).toEqual(playlists);
      });

      it('only allows arrays a valid playlist object', () => {
        store.commit('playlists/setList', {});
        expect(store.state.playlists.list).toEqual(null);
      });
    });

    describe('setTracks', () => {
      it('adds tracks to an existing playlist', () => {
        store.state.playlists.list = playlists;
        store.state.playlists.id = playlists.items[1].id;
        store.commit('playlists/setTracks', tracks);

        expect(store.state.playlists.list.items[1].tracks).toEqual(tracks);
      });
    });
  });

  describe('getters', () => {
    describe('current', () => {
      it('returns the current playlist', () => {
        store.state.playlists.list = playlists;
        store.state.playlists.id = playlists.items[1].id;
        expect(store.getters['playlists/current']).toEqual(playlists.items[1]);
      });

      it('returns null if no id is set', () => {
        store.state.playlists.list = playlists;
        expect(store.getters['playlists/current']).toEqual(null);
      });

      it('returns null if playlist not found', () => {
        store.state.playlists.list = playlists;
        store.state.playlists.id = 'wrongId';
        expect(store.getters['playlists/current']).toEqual(null);
      });
    });

    describe('currentTracks', () => {
      it('returns the current tracks', () => {
        store.state.playlists.list = playlists;
        store.state.playlists.list.items[1].tracks = tracks;
        store.state.playlists.id = playlists.items[1].id;
        expect(store.getters['playlists/currentTracks']).toEqual(tracks);
      });

      it('returns an empty object if no id is set', () => {
        store.state.playlists.list = playlists;
        store.state.playlists.list.items[1].tracks = tracks;
        expect(store.getters['playlists/currentTracks']).toEqual({});
      });

      it('returns an empty object if playlist not found', () => {
        store.state.playlists.list = playlists;
        store.state.playlists.list.items[1].tracks = tracks;
        store.state.playlists.id = 'wrongId';
        expect(store.getters['playlists/currentTracks']).toEqual({});
      });
    });
  });

  describe('actions', () => {
    describe('fetchPlaylists', () => {
      beforeAll(() => {
        window.localStorage.setItem('access_token', 'access_token');
      });

      afterAll(() => {
        window.localStorage.removeItem('access_token');
      });

      it('returns a list of playlists', async () => {
        mock.onGet('/v1/me/playlists').reply(200, playlists);

        await store.dispatch('playlists/fetchList');

        expect(store.state.playlists.list).toEqual(playlists);
      });
    });
  });
});
