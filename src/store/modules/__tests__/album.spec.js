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
});
