import Vuex from 'vuex';
import clonedeep from 'lodash.clonedeep';
import { createLocalVue } from '@vue/test-utils';

import playerStore from './playerStore';

jest.mock('@/api');

const localVue = createLocalVue();
localVue.use(Vuex);

describe('playerStore', () => {
  let store;
  let connect;
  let Spotify;

  beforeEach(() => {
    store = new Vuex.Store(clonedeep(playerStore));
    connect = jest.fn();
    class Player { connect = connect }
    Spotify = { Player };
    global.Spotify = Spotify;
  });

  describe('createPlayer', () => {
    it('should create a new spotify player instance and commit it', () => {
      expect(store.state.player).toEqual(null);

      store.dispatch('createPlayer');

      expect(connect).toHaveBeenCalled();
      expect(store.state.player).toBeInstanceOf(Spotify.Player);
    });
  });
});
