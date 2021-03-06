import { splitHash } from 'utils/routerHelper';

export default (to, from, next) => {
  const splitedHash = splitHash(to.hash);
  if (splitedHash.access_token) {
    window.localStorage.setItem('access_token', splitedHash.access_token);
    const redirectUrl = window.localStorage.getItem('redirect_url');
    if (redirectUrl) {
      window.localStorage.removeItem('redirect_url');
      return next(redirectUrl);
    }
    return next(to.path);
  }

  const accessToken = window.localStorage.getItem('access_token');
  if (to.name !== 'Login' && !accessToken) return next({ name: 'Login' });
  if (to.name === 'Login' && accessToken) return next({ name: 'Home' });

  return next();
};
