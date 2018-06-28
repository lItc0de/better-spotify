import player from '@/store/modules/player';
import * as client from '@/utils/fetchFromSpotify';

describe('player module', () => {
  beforeEach(() => {
    client.fetchFromSpotify = jest.fn();
    client.putToSpotify = jest.fn();
  });

  describe('GET devices', () => {
    it('has a default state', () => {
      expect(player.state.devices).toEqual([]);
    });

    it('sets the state', () => {
      const devices = ['device'];
      const state = { devices: [] };
      player.mutations.setDevices(state, devices);
      expect(state.devices).toEqual(devices);
    });

    it('commits the fetched items', async () => {
      const commit = jest.fn();
      const devices = ['device'];
      client.fetchFromSpotify.mockReturnValueOnce(devices);
      await player.actions.fetchDevices({ commit });
      expect(client.fetchFromSpotify).toHaveBeenCalledWith('/me/player/devices');
      expect(commit).toHaveBeenCalledWith('setDevices', devices);
    });

    it('does not call the commit method when there is a fetch error', async () => {
      const commit = jest.fn();
      await player.actions.fetchDevices({ commit });
      expect(commit).not.toHaveBeenCalled();
    });
  });

  describe('GET playback', () => {
    it('has a default state', () => {
      expect(player.state.playback).toEqual({});
    });

    it('sets the state', () => {
      const playback = { playback: 'playback' };
      const state = { playback: {} };
      player.mutations.setPlayback(state, playback);
      expect(state.playback).toEqual(playback);
    });

    it('commits the fetched items', async () => {
      const commit = jest.fn();
      const playback = { playback: 'playback' };
      client.fetchFromSpotify.mockReturnValueOnce(playback);
      await player.actions.fetchPlayback({ commit });
      expect(client.fetchFromSpotify).toHaveBeenCalledWith('/me/player');
      expect(commit).toHaveBeenCalledWith('setPlayback', playback);
    });

    it('does not call the commit method when there is a fetch error', async () => {
      const commit = jest.fn();
      await player.actions.fetchPlayback({ commit });
      expect(commit).not.toHaveBeenCalled();
    });
  });

  describe('GET history', () => {
    it('has a default state', () => {
      expect(player.state.history).toEqual([]);
    });

    it('sets the state', () => {
      const history = { history: 'history' };
      const state = { history: {} };
      player.mutations.setHistory(state, history);
      expect(state.history).toEqual(history);
    });

    it('commits the fetched items', async () => {
      const commit = jest.fn();
      const history = { history: 'history' };
      client.fetchFromSpotify.mockReturnValueOnce(history);
      await player.actions.fetchHistory({ commit });
      expect(client.fetchFromSpotify).toHaveBeenCalledWith('/me/player/recently-played');
      expect(commit).toHaveBeenCalledWith('setHistory', history);
    });

    it('does not call the commit method when there is a fetch error', async () => {
      const commit = jest.fn();
      await player.actions.fetchHistory({ commit });
      expect(commit).not.toHaveBeenCalled();
    });
  });

  describe('GET currentTrack', () => {
    it('has a default state', () => {
      expect(player.state.currentTrack).toEqual({});
    });

    it('sets the state', () => {
      const currentTrack = { currentTrack: 'currentTrack' };
      const state = { currentTrack: {} };
      player.mutations.setCurrentTrack(state, currentTrack);
      expect(state.currentTrack).toEqual(currentTrack);
    });

    it('commits the fetched items', async () => {
      const commit = jest.fn();
      const currentTrack = { currentTrack: 'currentTrack' };
      client.fetchFromSpotify.mockReturnValueOnce(currentTrack);
      await player.actions.fetchCurrentTrack({ commit });
      expect(client.fetchFromSpotify).toHaveBeenCalledWith('/me/player/currently-playing');
      expect(commit).toHaveBeenCalledWith('setCurrentTrack', currentTrack);
    });

    it('does not call the commit method when there is a fetch error', async () => {
      const commit = jest.fn();
      await player.actions.fetchCurrentTrack({ commit });
      expect(commit).not.toHaveBeenCalled();
    });
  });

  describe('PUT pause', () => {
    it('has a default state', () => {
      expect(player.state.playing).toBe(false);
    });

    it('sets the state', () => {
      const state = { playing: true };
      player.mutations.setPause(state);
      expect(state.playing).toBe(false);
    });

    it('commits when fetch result', async () => {
      const commit = jest.fn();
      client.putToSpotify.mockReturnValueOnce(true);
      await player.actions.putPause({ commit });
      expect(client.putToSpotify).toHaveBeenCalledWith('/me/player/pause');
      expect(commit).toHaveBeenCalledWith('setPause');
    });

    it('does not call the commit method when there is a put error', async () => {
      const commit = jest.fn();
      await player.actions.putPause({ commit });
      expect(commit).not.toHaveBeenCalled();
    });
  });

  describe('PUT seek', () => {
    it('has a default state', () => {
      expect(player.state.seek).toBe(0);
    });

    it('sets the state', () => {
      const state = { seek: 0 };
      const ms = 2500;
      player.mutations.setSeek(state, ms);
      expect(state.seek).toBe(ms);
    });

    it('commits when fetch result', async () => {
      const commit = jest.fn();
      const seek = 500;
      client.putToSpotify.mockReturnValueOnce(true);
      await player.actions.putSeek({ commit }, seek);
      expect(client.putToSpotify).toHaveBeenCalledWith('/me/player/seek?position_ms=500');
      expect(commit).toHaveBeenCalledWith('setSeek', seek);
    });

    it('does not call the commit method when there is a put error', async () => {
      const commit = jest.fn();
      await player.actions.putSeek({ commit });
      expect(commit).not.toHaveBeenCalled();
    });

    it('sets default seek to 0 when not provided', async () => {
      const commit = jest.fn();
      client.putToSpotify.mockReturnValueOnce(true);
      await player.actions.putSeek({ commit });
      expect(commit).toHaveBeenCalledWith('setSeek', 0);
    });
  });

  describe('PUT repeat', () => {
    it('has a default state', () => {
      expect(player.state.repeat).toBe('off');
    });

    it('sets the state', () => {
      const state = { repeat: 'off' };
      player.mutations.setRepeat(state, 'track');
      expect(state.repeat).toBe('track');
    });

    it('commits when fetch result', async () => {
      const commit = jest.fn();
      client.putToSpotify.mockReturnValueOnce(true);
      await player.actions.putRepeat({ commit }, 'track');
      expect(client.putToSpotify).toHaveBeenCalledWith('/me/player/repeat?state=track');
      expect(commit).toHaveBeenCalledWith('setRepeat', 'track');
    });

    it('does not call the commit method when there is a put error', async () => {
      const commit = jest.fn();
      await player.actions.putRepeat({ commit });
      expect(commit).not.toHaveBeenCalled();
    });

    it('sets default repeat to 0 when not provided', async () => {
      const commit = jest.fn();
      client.putToSpotify.mockReturnValueOnce(true);
      await player.actions.putRepeat({ commit });
      expect(commit).toHaveBeenCalledWith('setRepeat', 'off');
    });

    it('has an action for repeat: "off"', async () => {
      const dispatch = jest.fn();
      player.actions.repeatOff({ dispatch });
      expect(dispatch).toHaveBeenCalledWith('putRepeat', 'off');
    });

    it('has an action for repeat: "track"', async () => {
      const dispatch = jest.fn();
      player.actions.repeatTrack({ dispatch });
      expect(dispatch).toHaveBeenCalledWith('putRepeat', 'track');
    });

    it('has an action for repeat: "context"', async () => {
      const dispatch = jest.fn();
      player.actions.repeatContext({ dispatch });
      expect(dispatch).toHaveBeenCalledWith('putRepeat', 'context');
    });
  });

  describe('PUT volume', () => {
    it('has a default state', () => {
      expect(player.state.volume).toBe(100);
    });

    it('sets the state', () => {
      const state = { volume: 0 };
      const volume = 50;
      player.mutations.setVolume(state, volume);
      expect(state.volume).toBe(volume);
    });

    it('commits when fetch result', async () => {
      const commit = jest.fn();
      const volume = 50;
      client.putToSpotify.mockReturnValueOnce(true);
      await player.actions.putVolume({ commit }, volume);
      expect(client.putToSpotify).toHaveBeenCalledWith(`/me/player/volume?volume_percent=${volume}`);
      expect(commit).toHaveBeenCalledWith('setVolume', volume);
    });

    it('does not call the commit method when there is a put error', async () => {
      const commit = jest.fn();
      await player.actions.putVolume({ commit });
      expect(commit).not.toHaveBeenCalled();
    });

    it('sets default volume to 100 when not provided', async () => {
      const commit = jest.fn();
      client.putToSpotify.mockReturnValueOnce(true);
      await player.actions.putVolume({ commit });
      expect(commit).toHaveBeenCalledWith('setVolume', 100);
    });

    it('sets the maximum volume to 100', async () => {
      const commit = jest.fn();
      client.putToSpotify.mockReturnValueOnce(true);
      await player.actions.putVolume({ commit }, 1000);
      expect(commit).toHaveBeenCalledWith('setVolume', 100);
    });
  });
});
