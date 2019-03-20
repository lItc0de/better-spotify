import Vue from 'vue';
import Router from 'vue-router';

import routes from './routes';

const config = {
  mode: 'history',
  routes: [
    ...routes,
  ],
};

Vue.use(Router);

const router = new Router(config);

export default router;
