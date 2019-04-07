import Vuex from 'vuex';
import clonedeep from 'lodash.clonedeep';
import { createLocalVue, shallowMount } from '@vue/test-utils';

import Controls from './Controls.vue';
import storeConfig from '@/store/config';
import playback from '@/__mocks__/playback.json';
import api from '@/api';
import { msToTime } from '@/filters/timeFilters';

jest.mock('@/api');
jest.useFakeTimers();

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.filter('msToTime', msToTime);

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
  let trackDuration;
  let progressBar;

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
    trackDuration = wrapper.find('[data-test="track-duration"]');
    progressBar = wrapper.find('[data-test="progress-bar"]');
  });

  afterEach(() => {
    Object.keys(api).forEach(key => api[key].mockClear());
  });

  describe('control state', () => {
    it('shows correct state', () => {
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith('player/getPlayback', undefined);

      expect(shuffleBtn.text()).toEqual('no_shuffle');
      expect(playBtn.text()).toEqual('pause');
      expect(repeatBtn.text()).toEqual('off');
      expect(trackInfo.text()).toEqual('6 A.M. - DJ HMC');
      expect(trackDuration.text()).toEqual('0:46');
    });
  });

  describe('progress', () => {
    let newPlayback;
    let newProgress;

    beforeEach(() => {
      newPlayback = clonedeep(playback);
      newProgress = Number(newPlayback.progress_ms) + 1000;
      newPlayback.progress_ms = newProgress;
    });

    it('shows and updates the song duration', async () => {
      api.getPlayback.mockImplementationOnce(() => Promise
        .resolve({ status: 200, data: clonedeep(newPlayback) }));

      expect(trackProgress.text()).toEqual('0:44');
      expect(progressBar.vm.duration).toEqual(playback.item.duration_ms);
      expect(progressBar.vm.progress.toString()).toEqual(playback.progress_ms);

      await wrapper.vm.getPlayback();
      jest.runAllTimers();

      expect(trackProgress.text()).toEqual('0:46');
      expect(progressBar.vm.duration).toEqual(playback.item.duration_ms);
      expect(progressBar.vm.progress).toEqual(playback.item.duration_ms);
    });

    it('triggers an getPlayback when song is finished', async () => {
      api.getPlayback.mockImplementationOnce(() => Promise
        .resolve({ status: 200, data: clonedeep(newPlayback) }));

      expect(trackInfo.text()).toEqual('6 A.M. - DJ HMC');

      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenLastCalledWith('player/getPlayback', undefined);

      await wrapper.vm.getPlayback();

      expect(store.dispatch).toHaveBeenCalledTimes(2);
      expect(store.dispatch).toHaveBeenLastCalledWith('player/getPlayback', undefined);

      jest.runAllTimers();

      expect(store.dispatch).toHaveBeenCalledTimes(3);
      expect(store.dispatch).toHaveBeenLastCalledWith('player/getPlayback', undefined);
    });

    it('doesn‘t update the duration when pause', async () => {
      newPlayback.is_playing = false;
      api.getPlayback.mockImplementationOnce(() => Promise
        .resolve({ status: 200, data: clonedeep(newPlayback) }));

      expect(trackProgress.text()).toEqual('0:44');

      await wrapper.vm.getPlayback();
      jest.runAllTimers();

      expect(trackProgress.text()).toEqual('0:45');
    });

    it('triggers the interval when playing starts', async () => {
      newPlayback.is_playing = false;
      api.getPlayback.mockImplementationOnce(() => Promise
        .resolve({ status: 200, data: clonedeep(newPlayback) }));

      expect(trackProgress.text()).toEqual('0:44');

      await wrapper.vm.getPlayback();
      jest.runAllTimers();

      expect(trackProgress.text()).toEqual('0:45');

      newPlayback.is_playing = true;
      api.getPlayback.mockImplementationOnce(() => Promise
        .resolve({ status: 200, data: clonedeep(newPlayback) }));

      await wrapper.vm.getPlayback();
      jest.runAllTimers();

      expect(trackProgress.text()).toEqual('0:46');
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
