import album from '@/store/modules/album';

describe('player module', () => {
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
      const dispatch = jest.fn().mockReturnValue(current);
      await album.actions.fetchAlbum({ commit, dispatch }, id);
      expect(dispatch).toHaveBeenCalledWith('client/fetch', {
        path: `/albums/${id}`,
        method: 'get',
      }, { root: true });
      expect(commit).toHaveBeenCalledWith('setCurrent', current);
    });

    it('does not call the commit method when there is a fetch error', async () => {
      const commit = jest.fn();
      const dispatch = jest.fn();
      await album.actions.fetchAlbum({ commit, dispatch });
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
      const dispatch = jest.fn().mockReturnValue(currentTracks);
      await album.actions.fetchAlbumTracks({ commit, dispatch }, id, limit, offset);
      expect(dispatch).toHaveBeenCalledWith('client/fetch', {
        path: `/albums/${id}/tracks?limit=${limit}&offset=${offset}`,
        method: 'get',
      }, { root: true });
      expect(commit).toHaveBeenCalledWith('setCurrentTracks', currentTracks);
    });

    it('does not call the commit method when there is a fetch error', async () => {
      const commit = jest.fn();
      const dispatch = jest.fn();
      await album.actions.fetchAlbumTracks({ commit, dispatch });
      expect(commit).not.toHaveBeenCalled();
    });

    it('sets default offset and limit', async () => {
      const commit = jest.fn();
      const id = 'testId';
      const dispatch = jest.fn();
      await album.actions.fetchAlbumTracks({ commit, dispatch }, id);
      expect(dispatch).toHaveBeenCalledWith('client/fetch', {
        path: `/albums/${id}/tracks?limit=100&offset=0`,
        method: 'get',
      }, { root: true });
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
      const albums = { albums: ['foo'] };
      const dispatch = jest.fn().mockReturnValue(albums);
      await album.actions.fetchAlbums({ commit, dispatch }, idsArr);
      expect(dispatch).toHaveBeenCalledWith('client/fetch', {
        path: `/albums?ids=${ids}`,
        method: 'get',
      }, { root: true });
      expect(commit).toHaveBeenCalledWith('setAlbums', albums.albums);
    });

    it('does not call the commit method when there is a fetch error', async () => {
      const commit = jest.fn();
      const dispatch = jest.fn();
      await album.actions.fetchAlbums({ commit, dispatch });
      expect(commit).not.toHaveBeenCalled();
    });
  });
});
