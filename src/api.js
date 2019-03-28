import axios from '@/client';

export default {
  getPlaylists: offset => axios.get(`v1/me/playlists${offset ? `?offset=${offset}` : ''}`),
  getPlaylist: playlistId => axios.get(`v1/playlists/${playlistId}`),
  getPlaylistsTracks: (playlistId, offset) => axios
    .get(`v1/playlists/${playlistId}/tracks${offset ? `?offset=${offset}` : ''}`),
};
