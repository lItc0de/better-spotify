import player from '@/store/modules/player';

describe('player module', () => {
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
      const dispatch = jest.fn().mockReturnValue(devices);
      await player.actions.fetchDevices({ commit, dispatch });
      expect(dispatch).toHaveBeenCalledWith({
        path: '/me/player/devices',
        method: 'get',
      }, { root: true });
      expect(commit).toHaveBeenCalledWith('setDevices', devices);
    });

    it('does not call the commit method when there is a fetch error', async () => {
      const commit = jest.fn();
      const dispatch = jest.fn();
      await player.actions.fetchDevices({ commit, dispatch });
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
      const dispatch = jest.fn().mockReturnValue(playback);
      await player.actions.fetchPlayback({ commit, dispatch });
      expect(dispatch).toHaveBeenCalledWith({
        path: '/me/player',
        method: 'get',
      }, { root: true });
      expect(commit).toHaveBeenCalledWith('setPlayback', playback);
    });

    it('does not call the commit method when there is a fetch error', async () => {
      const commit = jest.fn();
      const dispatch = jest.fn();
      await player.actions.fetchPlayback({ commit, dispatch });
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
      const dispatch = jest.fn().mockReturnValue(history);
      await player.actions.fetchHistory({ commit, dispatch });
      expect(dispatch).toHaveBeenCalledWith({
        path: '/me/player/recently-played',
        method: 'get',
      }, { root: true });
      expect(commit).toHaveBeenCalledWith('setHistory', history);
    });

    it('does not call the commit method when there is a fetch error', async () => {
      const commit = jest.fn();
      const dispatch = jest.fn();
      await player.actions.fetchHistory({ commit, dispatch });
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
      const dispatch = jest.fn().mockReturnValue(currentTrack);
      await player.actions.fetchCurrentTrack({ commit, dispatch });
      expect(dispatch).toHaveBeenCalledWith({
        path: '/me/player/currently-playing',
        method: 'get',
      }, { root: true });
      expect(commit).toHaveBeenCalledWith('setCurrentTrack', currentTrack);
    });

    it('does not call the commit method when there is a fetch error', async () => {
      const commit = jest.fn();
      const dispatch = jest.fn();
      await player.actions.fetchCurrentTrack({ commit, dispatch });
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
      const dispatch = jest.fn().mockReturnValue(true);
      await player.actions.putPause({ commit, dispatch });
      expect(dispatch).toHaveBeenCalledWith({
        path: '/me/player/pause',
        method: 'put',
      }, { root: true });
      expect(commit).toHaveBeenCalledWith('setPause');
    });

    it('does not call the commit method when there is a put error', async () => {
      const commit = jest.fn();
      const dispatch = jest.fn();
      await player.actions.putPause({ commit, dispatch });
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
      const dispatch = jest.fn().mockReturnValue(true);
      await player.actions.putSeek({ commit, dispatch }, seek);
      expect(dispatch).toHaveBeenCalledWith({
        path: `/me/player/seek?position_ms=${seek}`,
        method: 'put',
      }, { root: true });
      expect(commit).toHaveBeenCalledWith('setSeek', seek);
    });

    it('does not call the commit method when there is a put error', async () => {
      const commit = jest.fn();
      const dispatch = jest.fn();
      await player.actions.putSeek({ commit, dispatch });
      expect(commit).not.toHaveBeenCalled();
    });

    it('sets default seek to 0 when not provided', async () => {
      const commit = jest.fn();
      const dispatch = jest.fn().mockReturnValue(true);
      await player.actions.putSeek({ commit, dispatch });
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
      const dispatch = jest.fn().mockReturnValue(true);
      await player.actions.putRepeat({ commit, dispatch }, 'track');
      expect(dispatch).toHaveBeenCalledWith({
        path: '/me/player/repeat?state=track',
        method: 'put',
      }, { root: true });
      expect(commit).toHaveBeenCalledWith('setRepeat', 'track');
    });

    it('does not call the commit method when there is a put error', async () => {
      const commit = jest.fn();
      const dispatch = jest.fn();
      await player.actions.putRepeat({ commit, dispatch });
      expect(commit).not.toHaveBeenCalled();
    });

    it('sets default repeat to 0 when not provided', async () => {
      const commit = jest.fn();
      const dispatch = jest.fn().mockReturnValue(true);
      await player.actions.putRepeat({ commit, dispatch });
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
      const dispatch = jest.fn().mockReturnValue(true);
      await player.actions.putVolume({ commit, dispatch }, volume);
      expect(dispatch).toHaveBeenCalledWith({
        path: `/me/player/volume?volume_percent=${volume}`,
        method: 'put',
      }, { root: true });
      expect(commit).toHaveBeenCalledWith('setVolume', volume);
    });

    it('does not call the commit method when there is a put error', async () => {
      const commit = jest.fn();
      const dispatch = jest.fn();
      await player.actions.putVolume({ commit, dispatch });
      expect(commit).not.toHaveBeenCalled();
    });

    it('sets default volume to 100 when not provided', async () => {
      const commit = jest.fn();
      const dispatch = jest.fn().mockReturnValue(true);
      await player.actions.putVolume({ commit, dispatch });
      expect(commit).toHaveBeenCalledWith('setVolume', 100);
    });

    it('sets the maximum volume to 100', async () => {
      const commit = jest.fn();
      const dispatch = jest.fn().mockReturnValue(true);
      await player.actions.putVolume({ commit, dispatch }, 1000);
      expect(commit).toHaveBeenCalledWith('setVolume', 100);
    });
  });

  describe('POST next', () => {
    it('calls the api to play the next song', async () => {
      const dispatch = jest.fn().mockReturnValue(true);
      await player.actions.postNext({ dispatch });
      expect(dispatch).toHaveBeenCalledWith({
        path: '/me/player/next',
        method: 'post',
      }, { root: true });
    });
  });

  describe('POST previous', () => {
    it('calls the api to play the previous song', async () => {
      const dispatch = jest.fn().mockReturnValue(true);
      await player.actions.postPrevious({ dispatch });
      expect(dispatch).toHaveBeenCalledWith({
        path: '/me/player/previous',
        method: 'post',
      }, { root: true });
    });
  });

  describe('PUT play', () => {
    it('requests to play from context_uri', async () => {
      const options = { context_uri: 'context_uri' };
      const dispatch = jest.fn().mockReturnValue(true);
      await player.actions.putPlay({ dispatch }, options);
      expect(dispatch)
        .toHaveBeenCalledWith({
          path: '/me/player/play',
          method: 'put',
        }, JSON.stringify(options), { root: true });
    });
  });

  describe('PUT shuffle', () => {
    it('has a default state', () => {
      expect(player.state.shuffle).toBe(false);
    });

    it('sets the state', () => {
      const state = { shuffle: false };
      player.mutations.setShuffle(state, true);
      expect(state.shuffle).toBe(true);
    });

    it('commits when fetch result', async () => {
      const commit = jest.fn();
      const dispatch = jest.fn().mockReturnValue(true);
      await player.actions.putShuffle({ commit, dispatch }, true);
      expect(dispatch).toHaveBeenCalledWith({
        path: `/me/player/shuffle?state=${true}`,
        method: 'put',
      }, { root: true });
      expect(commit).toHaveBeenCalledWith('setShuffle', true);
    });

    it('does not call the commit method when there is a put error', async () => {
      const commit = jest.fn();
      const dispatch = jest.fn();
      await player.actions.putShuffle({ commit, dispatch });
      expect(commit).not.toHaveBeenCalled();
    });
  });

  describe('PUT playback', () => {
    it('sets the new playback device', async () => {
      const deviceId = 'test';
      const play = false;
      const dispatch = jest.fn().mockReturnValue(true);
      await player.actions.putPlayback({ dispatch }, deviceId, play);
      expect(dispatch).toHaveBeenCalledWith({
        path: '/me/player',
        method: 'put',
      }, JSON.stringify({ device_id: deviceId, play }), { root: true });
    });
  });
});
