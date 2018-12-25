import { createLocalVue, mount } from '@vue/test-utils';
import Router from 'vue-router';
import routerConfig from '@/router/config';
import { restoreMockedWindow, mockWindowLocation } from '@/__utils__/mockWindow';

import App from '@/App.vue';
import Login from '../../views/Login.vue';

const localVue = createLocalVue();
localVue.use(Router);

describe('playlist routes', () => {
  let wrapper;
  let router;

  beforeEach(() => {
    router = new Router(routerConfig);
    wrapper = mount(App, {
      localVue,
      router,
      stubs: ['x-app', 'x-text', 'x-spacer', 'x-btn'],
    });
  });

  describe('/login', () => {
    beforeAll(() => {
      mockWindowLocation('/login');
    });

    afterAll(() => {
      restoreMockedWindow();
    });

    it('loads the login view', () => {
      const matchedComponent = router.getMatchedComponents()[0];

      expect(wrapper.find(Login).exists()).toBe(true);
      expect(router.currentRoute.name).toEqual('Login');
      expect(router.currentRoute.meta.auth).toBe(true);
      expect(matchedComponent).toBe(Login);
    });
  });
});
