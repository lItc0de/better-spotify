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
  let trackName;
  let trackArtists;
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

      expect(shuffleBtn.vm.$attrs.title).toEqual('no_shuffle');
      expect(shuffleBtn.vm.$attrs.icon).toEqual('shuffle-disabled');

      expect(playBtn.vm.$attrs.title).toEqual('pause');
      expect(playBtn.vm.$attrs.icon).toEqual('pause');

      expect(repeatBtn.vm.$attrs.title).toEqual('repeat-off');
      expect(repeatBtn.vm.$attrs.icon).toEqual('repeat-off');

      trackName = wrapper.find('[data-test="track-name"]');
      trackArtists = wrapper.find('[data-test="track-artists"]');

      expect(trackName.text()).toEqual('6 A.M.');
      expect(trackArtists.text()).toEqual('DJ HMC');
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

      trackName = wrapper.find('[data-test="track-name"]');
      trackArtists = wrapper.find('[data-test="track-artists"]');

      expect(trackName.text()).toEqual('6 A.M.');
      expect(trackArtists.text()).toEqual('DJ HMC');

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

  describe('progressBar', () => {
    it('sets a new track position', () => {
      const newPosition = '123456';
      progressBar.vm.$emit('seek', newPosition);

      expect(api.seek).toHaveBeenCalledWith(newPosition);
    });
  });

  describe('Play/Pause button', () => {
    it('triggers play if playback is paused', () => {
      store.dispatch = jest.fn();
      playBtn.trigger('click');

      expect(store.dispatch).toHaveBeenCalledWith('player/play', undefined);
    });
  });

  describe('Shuffle button', () => {
    it('sets the shuffle state', () => {
      store.dispatch = jest.fn();
      shuffleBtn.trigger('click');

      expect(store.dispatch).toHaveBeenCalledWith('player/putShuffle', undefined);
    });
  });

  describe('Repeat button', () => {
    it('sets the repeat state', () => {
      store.dispatch = jest.fn();
      repeatBtn.trigger('click');

      expect(store.dispatch).toHaveBeenCalledWith('player/putRepeat', undefined);
    });
  });

  describe('Previous button', () => {
    it('plays the previous song', () => {
      store.dispatch = jest.fn();
      previousBtn.trigger('click');

      expect(store.dispatch).toHaveBeenCalledWith('player/previous', undefined);
    });
  });

  describe('Next button', () => {
    it('plays the next song', () => {
      store.dispatch = jest.fn();
      nextBtn.trigger('click');

      expect(store.dispatch).toHaveBeenCalledWith('player/next', undefined);
    });
  });
});
