import Vuex from 'vuex';
import clonedeep from 'lodash.clonedeep';
import { createLocalVue, shallowMount } from '@vue/test-utils';

import Controls from './Controls.vue';
import storeConfig from '@/store/config';
import playback from '@/__mocks__/playback.json';
import api from '@/api';

jest.mock('@/api');
jest.useFakeTimers();

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
  let trackProgress;

  beforeEach(() => {
    store = new Vuex.Store(clonedeep(storeConfig));
    jest.spyOn(store, 'dispatch');

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
    trackProgress = wrapper.find('[data-test="track-progress"]');
  });

  describe('control state', () => {
    it('shows correct state', () => {
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith('player/getPlayback', undefined);

      expect(shuffleBtn.text()).toEqual('no_shuffle');
      expect(playBtn.text()).toEqual('pause');
      expect(repeatBtn.text()).toEqual('off');
      expect(trackInfo.text()).toEqual('6 A.M. - DJ HMC');
    });
  });

  describe('progress', () => {
    it('shows and updates the song duration', async () => {
      const newPlayback = clonedeep(playback);
      newPlayback.progress_ms = Number(playback.progress_ms) + 100;
      api.getPlayback.mockImplementationOnce(() => Promise
        .resolve({ status: 200, data: newPlayback }));

      expect(trackProgress.text()).toEqual(playback.progress_ms);

      await wrapper.vm.getPlayback();
      jest.runAllTimers();

      expect(trackProgress.text()).toEqual(playback.item.duration_ms.toString());
    });

    it('doesn‘t update the duration when pause', async () => {
      const newPlayback = clonedeep(playback);
      const newProgress = Number(playback.progress_ms) + 100;
      newPlayback.progress_ms = newProgress;
      newPlayback.is_playing = false;
      api.getPlayback.mockImplementationOnce(() => Promise
        .resolve({ status: 200, data: newPlayback }));

      expect(trackProgress.text()).toEqual(playback.progress_ms);

      await wrapper.vm.getPlayback();
      jest.runAllTimers();

      expect(trackProgress.text()).toEqual(newProgress.toString());
    });

    it('triggers the interval when playing starts', async () => {
      const newPlayback = clonedeep(playback);
      const newProgress = Number(playback.progress_ms) + 100;
      newPlayback.progress_ms = newProgress;
      newPlayback.is_playing = false;
      api.getPlayback.mockImplementationOnce(() => Promise
        .resolve({ status: 200, data: newPlayback }));

      expect(trackProgress.text()).toEqual(playback.progress_ms);

      await wrapper.vm.getPlayback();
      jest.runAllTimers();

      expect(trackProgress.text()).toEqual(newProgress.toString());

      newPlayback.is_playing = true;
      api.getPlayback.mockImplementationOnce(() => Promise
        .resolve({ status: 200, data: newPlayback }));

      await wrapper.vm.getPlayback();
      jest.runAllTimers();

      expect(trackProgress.text()).toEqual(playback.item.duration_ms.toString());
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
