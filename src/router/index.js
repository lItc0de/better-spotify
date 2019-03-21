import Vue from 'vue';
import Router from 'vue-router';

import routes from './routes';
import beforeRoute from './beforeRoute';

const config = {
  mode: 'history',
  routes: [
    ...routes,
  ],
};

Vue.use(Router);

const router = new Router(config);

router.beforeEach(beforeRoute);

export default router;
