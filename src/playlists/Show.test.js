import Vuex from 'vuex';
import clonedeep from 'lodash.clonedeep';
import { createLocalVue, shallowMount } from '@vue/test-utils';

import Show from './Show.vue';
import storeConfig from '@/store/config';
import playlist from '@/__mocks__/playlist.json';
import api from '@/api';

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
      const tracks = wrapper.findAll('[data-test="track"]');
      expect(tracks.length).toBe(2);
    });
  });

  describe('track', () => {
    it('plays a track on double click in the playlist context', () => {
      const track = wrapper.find('[data-test="track"]');
      const params = {
        contextUri: playlist.uri,
        offset: 0,
      };
      api.play = jest.fn();
      jest.spyOn(wrapper.vm, 'playTrack');

      expect(api.play).not.toHaveBeenCalled();

      track.trigger('dblclick');

      expect(wrapper.vm.playTrack).toHaveBeenCalledWith(params.offset);
      expect(api.play).toHaveBeenCalledWith(params);
    });
  });
});
