import { join } from 'path';

const scopes = encodeURIComponent([
  'playlist-read-private',
  'streaming',
  'user-read-birthdate',
  'user-read-email',
  'user-read-private',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-library-read',
].join(' '));

const redirectPath = join(process.env.VUE_APP_HOST, process.env.BASE_URL).replace(/(https?:\/)/, '$1/');

export default 'https://accounts.spotify.com/authorize'
  + `?client_id=${process.env.VUE_APP_CLIENT_ID}`
  + '&response_type=token'
  + `&redirect_uri=${encodeURIComponent(redirectPath)}`
  + '&state=123'
  + `&scope=${scopes}`;
