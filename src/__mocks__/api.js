import clonedeep from 'lodash.clonedeep';

import playlists from './playlists.json';
import playlist from './playlist.json';
import playback from './playback.json';

export default {
  getPlaylists: jest.fn()
    .mockImplementation(() => Promise.resolve({ status: 200, data: clonedeep(playlists) })),
  getPlaylist: jest.fn()
    .mockImplementation(() => Promise.resolve({ status: 200, data: clonedeep(playlist) })),
  getPlayback: jest.fn()
    .mockImplementation(() => Promise.resolve({ status: 200, data: clonedeep(playback) })),
  getPlaylistsTracks: jest.fn()
    .mockImplementation(() => Promise.resolve({ status: 200, data: {} })),
  pause: jest.fn().mockImplementation(() => Promise.resolve({ status: 204 })),
  play: jest.fn().mockImplementation(() => Promise.resolve({ status: 204 })),
  next: jest.fn().mockImplementation(() => Promise.resolve({ status: 204 })),
  previous: jest.fn().mockImplementation(() => Promise.resolve({ status: 204 })),
  transfer: jest.fn().mockImplementation(() => Promise.resolve({ status: 204 })),
  shuffle: jest.fn().mockImplementation(() => Promise.resolve({ status: 204 })),
  repeat: jest.fn().mockImplementation(() => Promise.resolve({ status: 204 })),
  seek: jest.fn().mockImplementation(() => Promise.resolve({ status: 204 })),
};
