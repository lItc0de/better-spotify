export default [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: { auth: true },
  },
  {
    path: '/playlists',
    name: 'Playlists',
    component: () => import('@/playlists/Index.vue'),
    meta: { auth: true },
  },
];
