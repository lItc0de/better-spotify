import { createLocalVue } from '@vue/test-utils';
import Router from 'vue-router';
import routerConfig from '@/routes/config';

import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';

const localVue = createLocalVue();
localVue.use(Router);
const router = new Router(routerConfig);

describe('router', () => {
  it('links to home "/"', () => {
    router.push('/');

    const matchedComponent = router.getMatchedComponents()[0];

    expect(router.currentRoute.name).toEqual('home');
    expect(matchedComponent).toBe(Home);
  });

  it('links to login "/login"', () => {
    router.push('/login');

    const matchedComponent = router.getMatchedComponents()[0];

    expect(router.currentRoute.name).toEqual('login');
    expect(matchedComponent).toBe(Login);
  });
});
