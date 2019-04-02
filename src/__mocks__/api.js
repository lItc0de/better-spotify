import playlists from './playlists.json';
import playlist from './playlist.json';
import playback from './playback.json';

export default {
  getPlaylists: jest.fn()
    .mockImplementation(() => Promise.resolve({ status: 200, data: playlists })),
  getPlaylist: jest.fn()
    .mockImplementation(() => Promise.resolve({ status: 200, data: playlist })),
  getPlayback: jest.fn()
    .mockImplementation(() => Promise.resolve({ status: 200, data: playback })),
  getPlaylistsTracks: jest.fn()
    .mockImplementation(() => Promise.resolve({ status: 200, data: {} })),
  pause: jest.fn().mockImplementation(() => Promise.resolve({ status: 204 })),
  play: jest.fn().mockImplementation(() => Promise.resolve({ status: 204 })),
  next: jest.fn().mockImplementation(() => Promise.resolve({ status: 200 })),
  previous: jest.fn().mockImplementation(() => Promise.resolve({ status: 200 })),
  transfer: jest.fn().mockImplementation(() => Promise.resolve({ status: 200 })),
  shuffle: jest.fn().mockImplementation(() => Promise.resolve({ status: 204 })),
  repeat: jest.fn().mockImplementation(() => Promise.resolve({ status: 204 })),
};
