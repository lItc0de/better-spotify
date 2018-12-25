import Vue from 'vue';
import Router from 'vue-router';

import routes from './routes';
import { playlistsRoutes } from '@/features/playlists';
import { authenticateRoutes, authenticateBeforeRoute } from '@/features/authenticate';


export const config = {
  mode: 'history',
  routes: [
    ...routes,
    ...playlistsRoutes,
    ...authenticateRoutes,
  ],
};


Vue.use(Router);

const router = new Router(config);

router.beforeEach(authenticateBeforeRoute);

export default router;
