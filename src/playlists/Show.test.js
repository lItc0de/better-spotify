import Vuex from 'vuex';
import clonedeep from 'lodash.clonedeep';
import { createLocalVue, shallowMount } from '@vue/test-utils';

import Show from './Show.vue';
import storeConfig from '@/store/config';
import playlist from '@/__mocks__/playlist.json';

jest.mock('@/api');

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Playlists Show', () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = new Vuex.Store(clonedeep(storeConfig));
    wrapper = shallowMount(Show, {
      localVue,
      store,
      mocks: {
        $route: {
          params: { id: 'playlist_id' },
        },
      },
    });
  });

  describe('data loading', () => {
    it('shows the fetched playlist info', () => {
      const title = wrapper.find('[data-test="title"]');
      expect(title.text()).toEqual(playlist.name);
    });

    it('shows the playlist tracks', () => {
      const track = wrapper.findAll('[data-test="track"]');
      expect(track.length).toBe(2);
    });
  });
});
