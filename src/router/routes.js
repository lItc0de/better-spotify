export default [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
    meta: { auth: true },
  },

  {
    path: '/playlists',
    name: 'Playlists',
    component: () => import(/* webpackChunkName: "playlists" */ '@/playlists/Index.vue'),
    meta: { auth: true },
  },

  {
    path: '/playlists/:id',
    name: 'Playlist',
    component: () => import(/* webpackChunkName: "playlist" */ '@/playlists/Show.vue'),
    meta: { auth: true },
  },

  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
    meta: { auth: true },
  },
];
