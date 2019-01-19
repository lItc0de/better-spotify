import Vuex from 'vuex';
import cloneDeep from 'lodash.clonedeep';
import MockAdapter from 'axios-mock-adapter';
import { createLocalVue } from '@vue/test-utils';
import client from 'utils/client';

import playlistsMock from '../../__mocks__/playlists.json';
import newPlaylistsMock from '../../__mocks__/newPlaylists.json';
import playlistsMergedMock from '../../__mocks__/playlistsMerged.json';

import storeConfig from '@/store/config';

const mock = new MockAdapter(client);

const localVue = createLocalVue();
localVue.use(Vuex);

const getPlaylistsMock = () => cloneDeep(playlistsMock);
const getNewPlaylists = () => cloneDeep(newPlaylistsMock);
const getPlaylistsMerged = () => cloneDeep(playlistsMergedMock);

describe('playlist module', () => {
  let store;
  jest.useFakeTimers();

  beforeEach(() => {
    const config = cloneDeep(storeConfig);
    store = new Vuex.Store(config);
  });

  describe('mutations', () => {
    describe('setList', () => {
      it('fills the list with the passed items', () => {
        const playlists = getPlaylistsMock();
        expect(store.state.playlist.list).toEqual({});

        store.commit('playlists/setList', playlists);
        expect(store.state.playlists.list).toEqual(playlists);
      });
    });

    describe('pushList', () => {
      it('adds passed items to the list', () => {
        const playlists = getPlaylistsMock();
        const newPlaylists = getNewPlaylists();
        const playlistsMerged = getPlaylistsMerged();
        store.state.playlists.list = playlists;

        store.commit('playlists/pushList', newPlaylists);
        expect(store.state.playlists.list).toEqual(playlistsMerged);
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
        const playlists = getPlaylistsMock();
        mock.onGet('/v1/me/playlists').reply(200, playlists);
        store.commit = jest.fn();
        jest.spyOn(store, 'dispatch');

        await store.dispatch('playlists/fetchList');
        expect(store.commit).toHaveBeenNthCalledWith(1, 'playlists/setLoading', true, undefined);
        expect(store.commit).toHaveBeenNthCalledWith(2, 'playlists/setLoading', false, undefined);
        expect(store.commit).toHaveBeenNthCalledWith(3, 'playlists/setList', playlists, undefined);
        expect(store.dispatch).toHaveBeenCalledWith('playlists/handleScroll', undefined);
      });
    });

    describe('fetchNext', () => {
      it('fetches the next playlists from api and calls pushList', async () => {
        const newPlaylists = getNewPlaylists();
        const playlists = getPlaylistsMock();
        store.state.playlists.list = playlists;
        mock.onGet('/v1/me/playlists?offset=2').reply(200, newPlaylists);
        store.commit = jest.fn();
        jest.spyOn(store, 'dispatch');

        await store.dispatch('playlists/fetchNext');
        expect(store.commit).toHaveBeenNthCalledWith(1, 'playlists/setLoading', false, undefined);
        expect(store.commit).toHaveBeenNthCalledWith(2, 'playlists/pushList', newPlaylists, undefined);
        expect(store.dispatch).toHaveBeenCalledWith('playlists/handleScroll', undefined);
      });
    });

    describe('initEndlessScrolling', () => {
      it('commits the scrollArea', () => {
        const scrollArea = { $el: { addEventListener: jest.fn() } };
        store.commit = jest.fn();

        store.dispatch('playlists/initEndlessScrolling', scrollArea);

        expect(store.commit).toHaveBeenCalledWith('playlists/setScrollArea', scrollArea, undefined);
      });

      it('sets an event listener on the passed scrollArea', () => {
        const scrollArea = { $el: { addEventListener: jest.fn() } };

        store.dispatch('playlists/initEndlessScrolling', scrollArea);

        expect(scrollArea.$el.addEventListener).toHaveBeenCalled();
      });
    });

    describe('finishLoading', () => {
      it('commits isLoading false', () => {
        store.commit = jest.fn();
        store.dispatch('playlists/finishLoading');

        expect(store.commit).toHaveBeenCalledWith('playlists/setLoading', false, undefined);
      });

      it('triggers handleScroll', () => {
        jest.spyOn(store, 'dispatch');
        store.dispatch('playlists/finishLoading');

        expect(store.dispatch).toHaveBeenCalledWith('playlists/handleScroll', undefined);
      });
    });

    describe('handleScroll', () => {
      beforeEach(() => {
        const newPlaylists = getNewPlaylists();
        const playlists = getPlaylistsMock();
        const scrollArea = {
          $el: {
            scrollTop: 0,
            scrollTopMax: 0,
          },
        };

        store.state.playlists.list = playlists;
        store.state.playlists.scrollArea = scrollArea;
        mock.onGet('/v1/me/playlists?offset=2').reply(200, newPlaylists);
        jest.spyOn(store, 'dispatch');
        jest.spyOn(store, 'commit');
      });

      it('calls the fetchNext action', () => {
        store.dispatch('playlists/handleScroll');

        expect(setTimeout).toHaveBeenCalledTimes(1);
        jest.runAllTimers();
        expect(store.dispatch).toHaveBeenLastCalledWith('playlists/fetchNext', undefined);
      });

      it('doesn‘t call the fetchNext action if isLoading', () => {
        store.state.playlists.isLoading = true;

        store.dispatch('playlists/handleScroll');
        jest.runAllTimers();

        expect(store.dispatch).not.toHaveBeenLastCalledWith('playlists/fetchNext', undefined);
      });

      it('only calls fetchNext on scroll is bottom', () => {
        const scrollArea = {
          $el: {
            scrollTop: 0,
            scrollTopMax: 400,
          },
        };
        store.state.playlists.scrollArea = scrollArea;

        store.dispatch('playlists/handleScroll');
        jest.runAllTimers();

        expect(store.dispatch).not.toHaveBeenLastCalledWith('playlists/fetchNext', undefined);
      });

      it('doesn‘t call fetchNext if all items loaded', () => {
        store.state.playlists.list.total = 2;
        store.dispatch('playlists/handleScroll');
        jest.runAllTimers();

        expect(store.dispatch).not.toHaveBeenLastCalledWith('playlists/fetchNext', undefined);
      });
    });
  });


  describe('getters', () => {
    describe('offset', () => {
      it('returns the offset of the playlist items', () => {
        const playlists = getPlaylistsMock();
        store.state.playlists.list = playlists;

        expect(store.getters['playlists/offset']).toEqual(2);
      });
    });
  });
});
