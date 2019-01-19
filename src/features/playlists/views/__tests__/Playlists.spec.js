import Vuex from 'vuex';
import cloneDeep from 'lodash.clonedeep';
import { shallowMount, createLocalVue } from '@vue/test-utils';

import storeConfig from '@/store/config';
import Playlists from '../Playlists.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Playlists View', () => {
  let store;
  let wrapper;

  beforeAll(() => {
    window.localStorage.setItem('access_token', 'access_token');
  });

  afterAll(() => {
    window.localStorage.removeItem('access_token');
  });

  beforeEach(() => {
    const config = cloneDeep(storeConfig);
    store = new Vuex.Store(config);
    store.dispatch = jest.fn();

    wrapper = shallowMount(Playlists, {
      localVue,
      store,
    });
  });

  describe('view', () => {
    it('renders a container', () => {
      expect(wrapper.find('.container').exists()).toBe(true);
    });
  });

  describe('logic', () => {
    it('calls fetchList on init', () => {
      expect(store.dispatch).toHaveBeenCalledWith('playlists/fetchList', undefined);
    });
  });
});
