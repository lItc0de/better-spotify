import playlistRoutes from '@/features/playlists/routes';
import authenticateRoutes from '@/features/authenticate/routes';

const globalRoutes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: { auth: true },
  },
];

export default [
  ...globalRoutes,
  ...playlistRoutes,
  ...authenticateRoutes,
];
