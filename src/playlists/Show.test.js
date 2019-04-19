import Vuex from 'vuex';
import clonedeep from 'lodash.clonedeep';
import { createLocalVue, mount } from '@vue/test-utils';

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
    wrapper = mount(Show, {
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
      expect(tracks.at(0).vm.track).toEqual(playlist.tracks.items[0].track);
    });
  });

  describe('track', () => {
    it('plays a track on double click in the playlist context', () => {
      const track = wrapper.find('[data-test="track"]');
      const options = {
        contextUri: playlist.uri,
        offset: 0,
      };
      store.dispatch = jest.fn();
      jest.spyOn(wrapper.vm, 'playTrack');

      track.trigger('dblclick');

      expect(wrapper.vm.playTrack).toHaveBeenCalledWith(options.offset);
      expect(store.dispatch).toHaveBeenCalledWith('player/play', { options });
    });
  });
});
