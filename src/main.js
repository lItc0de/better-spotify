import Vue from 'vue';
import { sync } from 'vuex-router-sync';

import router from '@/router';
import store from '@/store';
import App from '@/App.vue';

import '@/plugins/xstyles';
import '@/registerServiceWorker';

Vue.config.productionTip = false;

const unsync = sync(store, router);

new Vue({
  router,
  store,
  render: h => h(App),
  beforeDestroy() {
    unsync();
  },
}).$mount('#app');
