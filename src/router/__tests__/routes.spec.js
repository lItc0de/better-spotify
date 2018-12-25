import { createLocalVue } from '@vue/test-utils';
import Router from 'vue-router';
import routerConfig from '@/router/routes';

import Home from '@/views/Home.vue';

const localVue = createLocalVue();
localVue.use(Router);
const router = new Router(routerConfig);

describe('router', () => {
  xit('links to home "/"', () => {
    router.push('/');

    const matchedComponent = router.getMatchedComponents()[0];

    expect(router.currentRoute.name).toEqual('Home');
    expect(router.currentRoute.meta.auth).toBe(true);
    expect(matchedComponent).toBe(Home);
  });
});
