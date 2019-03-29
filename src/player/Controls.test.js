import Vuex from 'vuex';
import clonedeep from 'lodash.clonedeep';
import { createLocalVue, shallowMount } from '@vue/test-utils';

import Controls from './Controls.vue';
import storeConfig from '@/store/config';
import api from '@/api';

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
      api.play = jest.fn();

      playBtn.trigger('click');

      expect(api.play).toHaveBeenCalledWith();
    });
  });
});
