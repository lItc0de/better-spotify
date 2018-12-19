import { createLocalVue, shallowMount } from '@vue/test-utils';
import Router from 'vue-router';
import routerConfig from '@/router/config';

import App from '@/App.vue';
import Playlists from '../../views/Playlists.vue';
import Playlist from '../../views/Playlist.vue';

const localVue = createLocalVue();
localVue.use(Router);

describe('playlist routes', () => {
  let wrapper;
  let router;

  beforeEach(() => {
    router = new Router(routerConfig);
    wrapper = shallowMount(App, {
      localVue,
      router,
    });
  });

  describe('/playlists', () => {
    xit('loads the playlists view', () => {
      router.push('/playlists');

      const matchedComponent = router.getMatchedComponents()[0];

      expect(wrapper.find(Playlists).exists()).toBe(true);
      expect(router.currentRoute.name).toEqual('Playlists');
      expect(router.currentRoute.meta.auth).toBe(true);
      expect(matchedComponent).toBe(Playlists);
    });
  });

  describe('/playlist/:id', () => {
    xit('loads the playlist detail view', () => {
      router.push('/playlist/123');

      const matchedComponent = router.getMatchedComponents()[0];

      expect(wrapper.find(Playlist).exists()).toBe(true);
      expect(router.currentRoute.name).toEqual('Playlist');
      expect(router.currentRoute.meta.auth).toBe(true);
      expect(matchedComponent).toBe(Playlist);
    });
  });
});
