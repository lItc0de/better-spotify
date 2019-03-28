import playlists from './playlists.json';
import playlist from './playlist.json';

export default {
  getPlaylists: () => Promise.resolve({ status: 200, data: playlists }),
  getPlaylist: () => Promise.resolve({ status: 200, data: playlist }),
};
