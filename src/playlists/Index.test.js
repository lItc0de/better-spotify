import Vuex from 'vuex';
import clonedeep from 'lodash.clonedeep';
import { createLocalVue, shallowMount } from '@vue/test-utils';

import Index from './Index.vue';
import storeConfig from '@/store/config';
import playlists from '@/__mocks__/playlists.json';

jest.mock('@/api');

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Playlists Index', () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = new Vuex.Store(clonedeep(storeConfig));
    wrapper = shallowMount(Index, {
      localVue,
      store,
    });
  });

  describe('data loading', () => {
    it('shows the fetched playlists', () => {
      const playlistElements = wrapper.findAll('[data-test="playlist"]');
      expect(playlistElements.length).toEqual(2);
      expect(playlistElements.at(0).vm.playlist).toEqual(playlists.items[0]);
      expect(playlistElements.at(1).vm.playlist).toEqual(playlists.items[1]);
    });
  });
});
