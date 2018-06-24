import player from '@/store/modules/player';
import fetchFromSpotify from '@/utils/fetchFromSpotify';

jest.mock('@/utils/fetchFromSpotify', () => jest.fn());

describe('player module', () => {
  beforeEach(() => {
    fetchFromSpotify.mockClear();
  });

  describe('devices', () => {
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
      fetchFromSpotify.mockReturnValueOnce(devices);
      await player.actions.fetchDevices({ commit });
      expect(commit).toHaveBeenCalledWith('setDevices', devices);
    });

    it('does not call the commit method when there is a fetch error', async () => {
      const commit = jest.fn();
      await player.actions.fetchDevices({ commit });
      expect(commit).not.toHaveBeenCalled();
    });
  });

  describe('playback', () => {
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
      fetchFromSpotify.mockReturnValueOnce(playback);
      await player.actions.fetchPlayback({ commit });
      expect(commit).toHaveBeenCalledWith('setPlayback', playback);
    });

    it('does not call the commit method when there is a fetch error', async () => {
      const commit = jest.fn();
      await player.actions.fetchPlayback({ commit });
      expect(commit).not.toHaveBeenCalled();
    });
  });

  describe('history', () => {
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
      fetchFromSpotify.mockReturnValueOnce(history);
      await player.actions.fetchHistory({ commit });
      expect(commit).toHaveBeenCalledWith('setHistory', history);
    });

    it('does not call the commit method when there is a fetch error', async () => {
      const commit = jest.fn();
      await player.actions.fetchHistory({ commit });
      expect(commit).not.toHaveBeenCalled();
    });
  });

  describe('currentTrack', () => {
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
      fetchFromSpotify.mockReturnValueOnce(currentTrack);
      await player.actions.fetchCurrentTrack({ commit });
      expect(commit).toHaveBeenCalledWith('setCurrentTrack', currentTrack);
    });

    it('does not call the commit method when there is a fetch error', async () => {
      const commit = jest.fn();
      await player.actions.fetchCurrentTrack({ commit });
      expect(commit).not.toHaveBeenCalled();
    });
  });
});
