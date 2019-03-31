import Vuex from 'vuex';
import clonedeep from 'lodash.clonedeep';
import { createLocalVue } from '@vue/test-utils';

import playerStore from './playerStore';
import playback from '@/__mocks__/playback.json';
import api from '@/api';

jest.mock('@/api');

const localVue = createLocalVue();
localVue.use(Vuex);

describe('playerStore', () => {
  let store;
  let connect;
  let Spotify;
  let addListener;

  beforeEach(() => {
    const params = { device_id: playback.device.id };
    store = new Vuex.Store(clonedeep(playerStore));
    connect = jest.fn();
    addListener = jest.fn().mockImplementation((_, callback) => callback(params));
    class Player {
      connect = connect

      addListener = addListener
    }
    Spotify = { Player };
    global.Spotify = Spotify;
  });

  afterEach(() => {
    Object.keys(api).forEach(key => api[key].mockClear());
  });

  describe('createPlayer', () => {
    it('should create a new spotify player instance and commit it', () => {
      expect(store.state.player).toEqual(null);

      store.dispatch('createPlayer');

      expect(connect).toHaveBeenCalled();
      expect(store.state.player).toBeInstanceOf(Spotify.Player);
    });

    it('should add an event listener on ready', () => {
      expect(store.state.deviceId).toEqual(null);
      store.dispatch('createPlayer');

      expect(addListener).toHaveBeenCalledWith('ready', expect.anything());
      expect(store.state.deviceId).toEqual(playback.device.id);
    });
  });

  describe('getPlayback', () => {
    it('fetches the current playback info and commits it', async () => {
      expect(store.state.playback).toEqual(null);
      expect(store.state.playing).toEqual(false);
      expect(store.state.progress).toEqual(null);
      expect(store.state.shuffle).toEqual(false);
      expect(store.state.repeat).toEqual('off');
      expect(store.state.track).toEqual(null);

      await store.dispatch('getPlayback');

      expect(store.state.playback).toEqual(playback);
      expect(store.state.playing).toEqual(playback.is_playing);
      expect(store.state.progress).toEqual(playback.progress_ms);
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

      store.dispatch('createPlayer');
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
});
