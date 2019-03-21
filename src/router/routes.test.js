import { createLocalVue, shallowMount } from '@vue/test-utils';
import Router from 'vue-router';
import routes from '@/router/routes';

import App from '@/App.vue';

const localVue = createLocalVue();
localVue.use(Router);

describe('router', () => {
  let wrapper;
  let router;

  beforeAll(() => {
    router = new Router({ routes });
    wrapper = shallowMount(App, {
      localVue,
      router,
    });
  });

  it('links to home "/"', async () => {
    router.push('/');
    await wrapper.vm.$nextTick();

    expect(router.currentRoute.name).toEqual('Home');
    expect(router.currentRoute.meta.auth).toBe(true);
  });

  it('links to "/playlists"', async () => {
    router.push('/playlists');
    await wrapper.vm.$nextTick();

    expect(router.currentRoute.name).toEqual('Playlists');
    expect(router.currentRoute.meta.auth).toBe(true);
  });

  it('links to "/login"', async () => {
    router.push('/login');
    await wrapper.vm.$nextTick();

    expect(router.currentRoute.name).toEqual('Login');
    expect(router.currentRoute.meta.auth).toBe(true);
  });
});
