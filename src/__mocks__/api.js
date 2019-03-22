import playlists from './playlists.json';

export default {
  getPlaylists: () => Promise.resolve({ status: 200, data: playlists }),
};
