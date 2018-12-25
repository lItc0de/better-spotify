import Vuex from 'vuex';
import { createLocalVue, mount } from '@vue/test-utils';
import Router from 'vue-router';
import { config as routerConfig } from '@/router';
import { restoreMockedWindow, mockWindowLocation } from '@/__utils__/mockWindow';

import App from '@/App.vue';
import Playlists from '../../views/Playlists.vue';
import Playlist from '../../views/Playlist.vue';

const localVue = createLocalVue();
localVue.use(Router);
localVue.use(Vuex);

describe('playlist routes', () => {
  let store;
  let wrapper;
  let router;

  beforeEach(() => {
    const config = {
      modules: {
        playlists: {
          namespaced: true,
          actions: {
            fetchList: jest.fn(),
          },
        },
      },
    };

    store = new Vuex.Store(config);
    router = new Router(routerConfig);
    wrapper = mount(App, {
      store,
      localVue,
      router,
      stubs: ['x-app', 'x-container', 'x-layout'],
    });
  });

  describe('/playlists', () => {
    beforeAll(() => {
      mockWindowLocation('/playlists');
    });

    afterAll(() => {
      restoreMockedWindow();
    });

    it('loads the playlists view', () => {
      const matchedComponent = router.getMatchedComponents()[0];

      expect(wrapper.find(Playlists).exists()).toBe(true);
      expect(router.currentRoute.name).toEqual('Playlists');
      expect(router.currentRoute.meta.auth).toBe(true);
      expect(matchedComponent).toBe(Playlists);
    });
  });

  describe('/playlist/:id', () => {
    beforeAll(() => {
      mockWindowLocation('/playlists/123');
    });

    afterAll(() => {
      restoreMockedWindow();
    });

    it('loads the playlist detail view', () => {
      const matchedComponent = router.getMatchedComponents()[0];

      expect(wrapper.find(Playlist).exists()).toBe(true);
      expect(router.currentRoute.name).toEqual('Playlist');
      expect(router.currentRoute.meta.auth).toBe(true);
      expect(matchedComponent).toBe(Playlist);
    });
  });
});
