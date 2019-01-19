import Vuex from 'vuex';
import cloneDeep from 'lodash.clonedeep';
import MockAdapter from 'axios-mock-adapter';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import client from 'utils/client';
import playlistMock from '../../__mocks__/playlist.json';
import { restoreMockedWindow, mockWindowLocation } from '@/__utils__/mockWindow';

import storeConfig from '@/store/config';
import Playlist from '../Playlist.vue';

const mock = new MockAdapter(client);

const localVue = createLocalVue();
localVue.use(Vuex);

const getPlaylist = () => cloneDeep(playlistMock);

describe('Playlists View', () => {
  let store;
  let wrapper;

  beforeAll(() => {
    window.localStorage.setItem('access_token', 'access_token');
  });

  beforeEach(() => {
    const config = cloneDeep(storeConfig);
    store = new Vuex.Store(config);

    wrapper = shallowMount(Playlist, {
      localVue,
      store,
      stubs: {
        'x-container': '<div class="container" />',
      },
    });
  });

  afterAll(() => {
    window.localStorage.removeItem('access_token');
  });

  afterEach(() => {
    restoreMockedWindow();
  });

  it('renders a container', () => {
    expect(wrapper.find('.container').exists()).toBe(true);
  });

  xit('sets the playlist id on route change', () => {
    const playlist = getPlaylist();
    mock.onGet(`/v1/playlists/${playlist.id}?offset=2`).reply(200, { bla: 123 });
    mockWindowLocation('/playlists/1234324');
  });
});
