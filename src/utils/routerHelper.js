import router from '@/routes';
import store from '@/store';

export const redirectBackOrHome = () => {
  router.push({ name: 'Home' });
};

export const loggedInOrRedirect = (to, from, next) => {
  const { loggedIn } = store.getters;
  const accessToken = window.localStorage.getItem('access_token');

  if (to.name === 'Login' && loggedIn) next({ name: 'Home' });

  if (to.matched.some(record => record.meta.auth)) {
    if (loggedIn) {
      next();
    } else if (accessToken) {
      store.commit('client/setApi', accessToken);
      next();
    } else next({ name: 'Login' });
  } else next();
};