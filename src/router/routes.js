import playlistRoutes from '@/features/playlists/routes';

const globalRoutes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: { auth: true },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/albums',
    name: 'Albums',
    component: () => import('@/views/Albums.vue'),
    meta: { auth: true },
  },
  {
    path: '/albums/:id',
    name: 'Album',
    component: () => import('@/views/Album.vue'),
    meta: { auth: true },
  },
  {
    path: '/artists',
    name: 'Artists',
    component: () => import('@/views/Artists.vue'),
    meta: { auth: true },
  },
  {
    path: '/artists/:id',
    name: 'Artist',
    component: () => import('@/views/Artist.vue'),
    meta: { auth: true },
  },
];

export default [
  ...globalRoutes,
  ...playlistRoutes,
];
