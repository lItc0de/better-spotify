import Vuex from 'vuex';
import clonedeep from 'lodash.clonedeep';
import { createLocalVue, shallowMount } from '@vue/test-utils';

import Controls from './Controls.vue';
import storeConfig from '@/store/config';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Player Controls', () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = new Vuex.Store(clonedeep(storeConfig));
    wrapper = shallowMount(Controls, {
      localVue,
      store,
    });
  });

  describe('Play/Pause button', () => {
    it('triggers play if playback is paused', () => {
      const playBtn = wrapper.find('[data-test="play"]');
      store.dispatch = jest.fn();

      playBtn.trigger('click');

      expect(store.dispatch).toHaveBeenCalledWith('player/play', undefined);
    });
  });
});
