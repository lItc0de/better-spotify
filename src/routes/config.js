import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Albums from '@/views/Albums.vue';

export default {
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { auth: true },
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/albums',
      name: 'Albums',
      component: Albums,
      meta: { auth: true },
    },
  ],
};
