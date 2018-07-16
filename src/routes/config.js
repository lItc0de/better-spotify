import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';

export default {
  mode: 'history',
  routes: [{
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { noAuth: true },
  }],
};
