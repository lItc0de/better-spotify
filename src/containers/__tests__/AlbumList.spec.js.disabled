import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';

import AlbumList from '@/containers/AlbumList.vue';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

describe('AlbumList component', () => {
  let wrapper;
  let store;

  beforeEach(() => {
    const album = {
      namespaced: true,
      actions: {
        fetchAlbums: jest.fn(),
      },
    };

    store = new Vuex.Store({
      modules: { album },
    });

    store.commit = jest.fn();

    wrapper = shallowMount(AlbumList, {
      localVue,
      store,
    });
  });

  it('has the correct name', () => {
    expect(wrapper.name()).toEqual('AlbumList');
  });
});
