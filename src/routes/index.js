import Vue from 'vue';
import Router from 'vue-router';
import routerConfig from '@/routes/config';

import { loggedInOrRedirect } from '@/utils/routerHelper';

Vue.use(Router);

const router = new Router(routerConfig);

router.beforeEach(loggedInOrRedirect);

export default router;
