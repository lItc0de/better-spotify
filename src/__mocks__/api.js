import playlists from './playlists.json';
import playlist from './playlist.json';
import playback from './playback.json';

export default {
  getPlaylists: () => Promise.resolve({ status: 200, data: playlists }),
  getPlaylist: () => Promise.resolve({ status: 200, data: playlist }),
  getPlayback: () => Promise.resolve({ status: 200, data: playback }),
};
