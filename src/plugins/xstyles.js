import Vue from 'vue';
// import XStyles from '@litc0de/xstyles/src/components';
// import '@litc0de/xstyles/src/style.styl';

import XStyles, { installFilters } from '@litc0de/xstyles';
import '@litc0de/xstyles/dist/xstyles.css';

Vue.use(XStyles);
installFilters(Vue);
