import Vuex from 'vuex';
import clonedeep from 'lodash.clonedeep';
import { createLocalVue } from '@vue/test-utils';

import playerStore from './playerStore';
import playback from '@/__mocks__/playback.json';
import webPlaybackState from '@/__mocks__/webPlaybackState.json';
import api from '@/api';

jest.mock('@/api');

const localVue = createLocalVue();
localVue.use(Vuex);

const repeatModes = ['off', 'context', 'track'];

describe('playerStore', () => {
  let store;
  let Spotify;
  let connect;
  let addListener;
  let getCurrentState;
  const eventResults = {};
  const listeners = [];

  beforeEach(() => {
    store = new Vuex.Store(clonedeep(playerStore));

    eventResults.ready = jest.fn().mockImplementation(() => ({ device_id: playback.device.id }));
    eventResults.player_state_changed = jest.fn().mockImplementation(() => webPlaybackState);
    connect = jest.fn();
    getCurrentState = jest.fn().mockImplementation(() => Promise.resolve(webPlaybackState));
    addListener = jest.fn().mockImplementation((key, callback) => {
      listeners[key] = () => callback(eventResults[key]());
    });
    class Player {
      connect = connect

      addListener = addListener

      getCurrentState = getCurrentState
    }
    Spotify = { Player };
    global.Spotify = Spotify;
    jest.useFakeTimers();
  });

  afterEach(() => {
    Object.keys(api).forEach(key => api[key].mockClear());
  });

  describe('createPlayer', () => {
    it('should create a new spotify player instance and set the playback state', async () => {
      expect(store.state.player).toEqual(null);
      expect(store.state.playing).toEqual(false);
      expect(store.state.progress).toEqual(null);
      expect(store.state.duration).toEqual(null);
      expect(store.state.shuffle).toEqual(false);
      expect(store.state.repeat).toEqual('off');
      expect(store.state.track).toEqual(null);

      await store.dispatch('createPlayer');

      expect(connect).toHaveBeenCalled();
      expect(getCurrentState).toHaveBeenCalled();
      expect(store.state.player).toBeInstanceOf(Spotify.Player);
      expect(store.state.playing).toEqual(!webPlaybackState.paused);
      expect(store.state.progress).toEqual(webPlaybackState.position);
      expect(store.state.duration).toEqual(null);
      expect(store.state.shuffle).toEqual(webPlaybackState.shuffle);
      expect(store.state.repeat).toEqual(repeatModes[webPlaybackState.repeat_mode]);
      expect(store.state.track).toEqual(webPlaybackState.track_window.current_track);
    });

    it('should add an event listener on ready', async () => {
      await store.dispatch('createPlayer');
      expect(addListener).toHaveBeenCalledWith('ready', expect.any(Function));

      expect(store.state.deviceId).toEqual(null);

      listeners.ready();

      expect(store.state.deviceId).toEqual(playback.device.id);
    });

    it('should add an event listener on player_state_changed', async () => {
      getCurrentState.mockImplementationOnce(() => Promise.resolve(null));
      expect(store.state.playing).toEqual(false);

      await store.dispatch('createPlayer');

      expect(addListener).toHaveBeenCalledWith('player_state_changed', expect.any(Function));
      expect(store.state.deviceId).toEqual(null);
      expect(store.state.playingDeviceId).toEqual(null);

      listeners.ready();

      expect(store.state.deviceId).toEqual(playback.device.id);
      expect(store.state.playingDeviceId).toEqual(null);

      listeners.player_state_changed();

      expect(store.state.playing).toEqual(true);
      expect(store.state.playingDeviceId).toEqual(playback.device.id);


      eventResults.player_state_changed.mockImplementationOnce(() => null);
      listeners.player_state_changed();

      expect(store.state.playingDeviceId).toEqual(null);
    });
  });

  describe('getPlayback', () => {
    it('fetches the current playback info and commits it', async () => {
      expect(store.state.playing).toEqual(false);
      expect(store.state.progress).toEqual(null);
      expect(store.state.duration).toEqual(null);
      expect(store.state.shuffle).toEqual(false);
      expect(store.state.repeat).toEqual('off');
      expect(store.state.track).toEqual(null);

      await store.dispatch('getPlayback');

      expect(store.state.playing).toEqual(playback.is_playing);
      expect(store.state.progress).toEqual(playback.progress_ms);
      expect(store.state.duration).toEqual(playback.item.duration_ms);
      expect(store.state.shuffle).toEqual(playback.shuffle_state);
      expect(store.state.repeat).toEqual(playback.repeat_state);
      expect(store.state.track).toEqual(playback.item);
    });
  });

  describe('play', () => {
    it('calls play with the given options and device id', async () => {
      const options = {};
      const deviceId = 0;
      const modifiedPlayback = clonedeep(playback);
      modifiedPlayback.is_playing = false;

      api.getPlayback.mockImplementationOnce(
        () => Promise.resolve({ status: 200, data: modifiedPlayback }),
      );

      await store.dispatch('play', { options, deviceId });

      expect(api.play).toHaveBeenCalledWith(options, deviceId);
      expect(store.state.playing).toBe(true);
    });

    it('sets the device id if no active device was found', async () => {
      const deviceId = playback.device.id;
      api.getPlayback.mockImplementationOnce(() => Promise.resolve({ status: 200, data: null }));
      getCurrentState.mockImplementationOnce(() => Promise.resolve(null));

      store.dispatch('createPlayer');
      listeners.ready();
      await store.dispatch('play');

      expect(api.play).toHaveBeenCalledWith(undefined, deviceId);
    });

    it('calls pause if already playing', async () => {
      await store.dispatch('play');

      expect(api.play).not.toHaveBeenCalled();
      expect(api.pause).toHaveBeenCalledWith();
      expect(store.state.playing).toBe(false);
    });

    it('doesn‘t call pause if its a new song', async () => {
      const options = { contextUri: 'uri' };

      await store.dispatch('play', { options });

      expect(api.pause).not.toHaveBeenCalled();
      expect(api.play).toHaveBeenCalledWith(options, undefined);
    });
  });

  describe('shuffle', () => {
    it('sets the shuffle state', async () => {
      expect(store.state.shuffle).toBe(false);
      await store.dispatch('putShuffle');
      expect(api.shuffle).toHaveBeenCalledWith(true);
      expect(store.state.shuffle).toBe(true);
    });

    it('sets false if shuffle is already true', async () => {
      const modifiedPlayback = clonedeep(playback);
      modifiedPlayback.shuffle_state = true;

      api.getPlayback.mockImplementationOnce(
        () => Promise.resolve({ status: 200, data: modifiedPlayback }),
      );

      await store.dispatch('putShuffle');
      expect(api.shuffle).toHaveBeenCalledWith(false);
      expect(store.state.shuffle).toBe(false);
    });
  });

  describe('repeat', () => {
    it('sets the repeat state', async () => {
      const modifiedPlayback = clonedeep(playback);

      expect(store.state.repeat).toBe('off');

      await store.dispatch('putRepeat');
      expect(api.repeat).toHaveBeenCalledWith('context');
      expect(store.state.repeat).toBe('context');

      modifiedPlayback.repeat_state = 'context';
      api.getPlayback.mockImplementationOnce(
        () => Promise.resolve({ status: 200, data: modifiedPlayback }),
      );

      await store.dispatch('putRepeat');
      expect(api.repeat).toHaveBeenCalledWith('track');
      expect(store.state.repeat).toBe('track');

      modifiedPlayback.repeat_state = 'track';
      api.getPlayback.mockImplementationOnce(
        () => Promise.resolve({ status: 200, data: modifiedPlayback }),
      );

      await store.dispatch('putRepeat');
      expect(api.repeat).toHaveBeenCalledWith('off');
      expect(store.state.repeat).toBe('off');
    });
  });

  describe('previous', () => {
    it('plays the previous song and updates the state', async () => {
      const modifiedPlayback = clonedeep(playback);
      jest.spyOn(store, 'dispatch');

      modifiedPlayback.item.id = 'previousSongId';
      api.getPlayback.mockImplementationOnce(
        () => Promise.resolve({ status: 200, data: modifiedPlayback }),
      );

      await store.dispatch('previous');
      // jest.runAllTimers();

      expect(api.previous).toHaveBeenCalled();
      // doesn't work at the moment https://stackoverflow.com/questions/51126786/jest-fake-timers-with-promises
      // expect(store.dispatch).toHaveBeenLastCalledWith('getPlayback');
    });
  });

  describe('next', () => {
    it('plays the next song and updates the state', async () => {
      const modifiedPlayback = clonedeep(playback);

      modifiedPlayback.item.id = 'nextSongId';
      api.getPlayback.mockImplementationOnce(
        () => Promise.resolve({ status: 200, data: modifiedPlayback }),
      );

      await store.dispatch('next');
      // jest.runAllTimers();

      expect(api.next).toHaveBeenCalled();
      // doesn't work at the moment https://stackoverflow.com/questions/51126786/jest-fake-timers-with-promises
      // expect(store.state.track.id).toEqual(modifiedPlayback.item.id);
    });
  });

  describe('seek', () => {
    it('sets new position and updates the state', async () => {
      const modifiedPlayback = clonedeep(playback);
      const newPosition = 123456;

      modifiedPlayback.progress_ms = newPosition;
      api.getPlayback.mockImplementationOnce(
        () => Promise.resolve({ status: 200, data: modifiedPlayback }),
      );

      await store.dispatch('seek', newPosition);
      // jest.runAllTimers();

      expect(api.seek).toHaveBeenCalledWith(newPosition);
      // doesn't work at the moment https://stackoverflow.com/questions/51126786/jest-fake-timers-with-promises
      // expect(store.state.progress).toEqual(modifiedPlayback.progress_ms);
    });
  });
});
