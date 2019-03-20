import { createLocalVue, shallowMount } from '@vue/test-utils';
import Router from 'vue-router';
import routes from '@/router/routes';

import App from '@/App.vue';

const localVue = createLocalVue();
localVue.use(Router);

const config = {
  mode: 'history',
  routes: [
    ...routes,
  ],
};

const router = new Router(config);
describe('router', () => {
  beforeAll(() => {
    shallowMount(App, {
      localVue,
      router,
    });
  });

  it('links to home "/"', () => {
    router.push('/');

    expect(router.currentRoute.name).toEqual('Home');
    expect(router.currentRoute.meta.auth).toBe(true);
  });
});
