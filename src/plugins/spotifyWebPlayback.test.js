import Vuex from 'vuex';
import { createLocalVue } from '@vue/test-utils';
import store from '@/store';

import './spotifyWebPlayback';

jest.mock('@/api');

const localVue = createLocalVue();
localVue.use(Vuex);

describe('spotifyWebPlayback', () => {
  beforeEach(() => {
    store.dispatch = jest.fn();
  });

  it('dispatches createPlayer on ready event', () => {
    expect(store.dispatch).not.toHaveBeenCalled();

    window.onSpotifyWebPlaybackSDKReady();

    expect(store.dispatch).toHaveBeenCalledWith('player/createPlayer');
  });
});
