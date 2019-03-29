import axios from '@/client';

export default {
  getPlaylists: offset => axios.get(`v1/me/playlists${offset ? `?offset=${offset}` : ''}`),

  getPlaylist: playlistId => axios.get(`v1/playlists/${playlistId}`),

  getPlaylistsTracks: (playlistId, offset) => axios
    .get(`v1/playlists/${playlistId}/tracks${offset ? `?offset=${offset}` : ''}`),

  pause: () => axios.put('v1/me/player/pause'),

  play: ({
    contextUri, uris, offset, positionMs,
  }, deviceId) => axios
    .put(`v1/me/player/play${deviceId ? `?device_id=${deviceId}` : ''}`, {
      ...(contextUri ? { context_uri: contextUri } : null),
      ...(uris ? { uris } : null),
      ...(offset ? { offset: { position: offset } } : null),
      ...(positionMs ? { postition_ms: positionMs } : null),
    }),

  next: () => axios.post('v1/me/player/next'),

  previous: () => axios.post('v1/me/player/previous'),

  transfer: (deviceId, play = true) => axios.put('v1/me/player', { device_ids: [deviceId], play }),
};
