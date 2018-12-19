import Vue from 'vue';
import Router from 'vue-router';
import config from '@/router/config';

import { loggedInOrRedirect } from '@/utils/routerHelper';

Vue.use(Router);

const router = new Router(config);

router.beforeEach(loggedInOrRedirect);

export default router;
