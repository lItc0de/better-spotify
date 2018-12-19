export default [
  {
    path: '/playlists',
    name: 'Playlists',
    component: () => import('../views/Playlists.vue'),
    meta: { auth: true },
  },
  {
    path: '/playlists/:id',
    name: 'Playlist',
    component: () => import('../views/Playlist.vue'),
    meta: { auth: true },
  },
];
