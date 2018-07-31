import Vue from 'vue';
import Vuex from 'vuex';

import modules from '@/store/modules';
import config from '@/store/config';

Vue.use(Vuex);

export default new Vuex.Store({
  modules,
  ...config,
});
