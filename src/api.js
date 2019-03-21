import axios from '@/client';

export default {
  getPlaylists: offset => axios.get(`v1/me/playlists${offset ? `?offset=${offset}` : ''}`),
};
