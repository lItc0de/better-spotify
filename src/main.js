import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import '@mdi/font/css/materialdesignicons.min.css';

import './plugins/xstyles';
import App from './App.vue';
import router from './routes';
import store from './store';
import './registerServiceWorker';

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
