import album from '@/store/modules/album';
import * as client from '@/utils/fetchFromSpotify';

describe('player module', () => {
  beforeEach(() => {
    client.fetchFromSpotify = jest.fn();
    client.putToSpotify = jest.fn();
    client.postToSpotify = jest.fn();
  });

  describe('GET current', () => {
    it('has a default state', () => {
      expect(album.state.current).toEqual({});
    });

    it('sets the state', () => {
      const current = { foo: 'bar' };
      const state = { current: {} };
      album.mutations.setCurrent(state, current);
      expect(state.current).toEqual(current);
    });

    it('commits the fetched items', async () => {
      const commit = jest.fn();
      const id = 'testId';
      const current = { foo: 'bar' };
      client.fetchFromSpotify.mockReturnValueOnce(current);
      await album.actions.fetchAlbum({ commit }, id);
      expect(client.fetchFromSpotify).toHaveBeenCalledWith(`/albums/${id}`);
      expect(commit).toHaveBeenCalledWith('setCurrent', current);
    });

    it('does not call the commit method when there is a fetch error', async () => {
      const commit = jest.fn();
      await album.actions.fetchAlbum({ commit });
      expect(commit).not.toHaveBeenCalled();
    });
  });

  describe('GET album tracks', () => {
    it('has a default state', () => {
      expect(album.state.currentTracks).toEqual([]);
    });

    it('sets the state', () => {
      const currentTracks = ['foo'];
      const state = { currentTracks: [] };
      album.mutations.setCurrentTracks(state, currentTracks);
      expect(state.currentTracks).toEqual(currentTracks);
    });

    it('commits the fetched items', async () => {
      const commit = jest.fn();
      const id = 'testId';
      const limit = 20;
      const offset = 2;
      const currentTracks = ['foo'];
      client.fetchFromSpotify.mockReturnValueOnce(currentTracks);
      await album.actions.fetchAlbumTracks({ commit }, id, limit, offset);
      expect(client.fetchFromSpotify).toHaveBeenCalledWith(`/albums/${id}/tracks?limit=${limit}&offset=${offset}`);
      expect(commit).toHaveBeenCalledWith('setCurrentTracks', currentTracks);
    });

    it('does not call the commit method when there is a fetch error', async () => {
      const commit = jest.fn();
      await album.actions.fetchAlbumTracks({ commit });
      expect(commit).not.toHaveBeenCalled();
    });

    it('sets default offset and limit', async () => {
      const commit = jest.fn();
      const id = 'testId';
      await album.actions.fetchAlbumTracks({ commit }, id);
      expect(client.fetchFromSpotify).toHaveBeenCalledWith(`/albums/${id}/tracks?limit=100&offset=0`);
    });
  });

  describe('GET albums', () => {
    it('has a default state', () => {
      expect(album.state.albums).toEqual([]);
    });

    it('sets the state', () => {
      const albums = ['foo'];
      const state = { albums: [] };
      album.mutations.setAlbums(state, albums);
      expect(state.albums).toEqual(albums);
    });

    it('commits the fetched items', async () => {
      const commit = jest.fn();
      const ids = 'id1,id2,id3';
      const idsArr = ids.split(',');
      const albums = ['foo'];
      client.fetchFromSpotify.mockReturnValueOnce(albums);
      await album.actions.fetchAlbums({ commit }, idsArr);
      expect(client.fetchFromSpotify).toHaveBeenCalledWith(`/albums?ids=${ids}`);
      expect(commit).toHaveBeenCalledWith('setAlbums', albums);
    });

    it('does not call the commit method when there is a fetch error', async () => {
      const commit = jest.fn();
      await album.actions.fetchAlbums({ commit });
      expect(commit).not.toHaveBeenCalled();
    });
  });
});
