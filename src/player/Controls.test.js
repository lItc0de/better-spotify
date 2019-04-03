import Vuex from 'vuex';
import clonedeep from 'lodash.clonedeep';
import { createLocalVue, shallowMount } from '@vue/test-utils';

import Controls from './Controls.vue';
import storeConfig from '@/store/config';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Player Controls', () => {
  let store;
  let wrapper;
  let shuffleBtn;
  let previousBtn;
  let playBtn;
  let nextBtn;
  let repeatBtn;
  let trackInfo;

  beforeEach(() => {
    store = new Vuex.Store(clonedeep(storeConfig));
    wrapper = shallowMount(Controls, {
      localVue,
      store,
    });

    shuffleBtn = wrapper.find('[data-test="shuffle"]');
    previousBtn = wrapper.find('[data-test="previous"]');
    playBtn = wrapper.find('[data-test="play"]');
    nextBtn = wrapper.find('[data-test="next"]');
    repeatBtn = wrapper.find('[data-test="repeat"]');
    trackInfo = wrapper.find('[data-test="track-info"]');
  });

  describe('control state', () => {
    it('shows correct state', () => {
      const playback = {
        progress_ms: 1234,
        is_playing: true,
        item: {
          name: 'track',
          artists: [
            { name: 'artist1' },
            { name: 'artist2' },
          ],
        },
        shuffle_state: true,
        repeat_state: 'context',
      };

      expect(shuffleBtn.text()).toEqual('no_shuffle');
      expect(previousBtn.text()).toEqual('previous');
      expect(playBtn.text()).toEqual('play');
      expect(nextBtn.text()).toEqual('next');
      expect(repeatBtn.text()).toEqual('off');
      expect(trackInfo.text()).toEqual('');

      store.commit('player/setPlayback', playback);

      expect(shuffleBtn.text()).toEqual('shuffle');
      expect(playBtn.text()).toEqual('pause');
      expect(repeatBtn.text()).toEqual('context');
      expect(trackInfo.text()).toEqual('track - artist1, artist2');
    });
  });

  describe('Play/Pause button', () => {
    it('triggers play if playback is paused', () => {
      store.dispatch = jest.fn();
      playBtn.trigger('click');

      expect(store.dispatch).toHaveBeenCalledWith('player/play', expect.anything());
    });
  });

  describe('Shuffle button', () => {
    it('sets the shuffle state', () => {
      store.dispatch = jest.fn();
      shuffleBtn.trigger('click');

      expect(store.dispatch).toHaveBeenCalledWith('player/putShuffle', expect.anything());
    });
  });

  describe('Repeat button', () => {
    it('sets the repeat state', () => {
      store.dispatch = jest.fn();
      repeatBtn.trigger('click');

      expect(store.dispatch).toHaveBeenCalledWith('player/putRepeat', expect.anything());
    });
  });

  describe('Previous button', () => {
    it('plays the previous song', () => {
      store.dispatch = jest.fn();
      previousBtn.trigger('click');

      expect(store.dispatch).toHaveBeenCalledWith('player/previous', expect.anything());
    });
  });

  describe('Next button', () => {
    it('plays the next song', () => {
      store.dispatch = jest.fn();
      nextBtn.trigger('click');

      expect(store.dispatch).toHaveBeenCalledWith('player/next', expect.anything());
    });
  });
});
