import beforeRoute from './beforeRoute';

const accessToken = 'access_token';
const from = {};

describe('authentication before route', () => {
  let next;

  beforeEach(() => {
    next = jest.fn();
  });

  afterEach(() => {
    window.localStorage.removeItem('access_token');
    window.localStorage.removeItem('redirect_url');
  });

  it('saves the access token to the local store', () => {
    const to = { hash: `#access_token=${accessToken}`, path: '/' };
    const redirectUrl = '/test';

    window.localStorage.setItem('redirect_url', redirectUrl);
    beforeRoute(to, from, next);

    expect(window.localStorage.getItem('access_token')).toEqual(accessToken);
    expect(window.localStorage.getItem('redirect_url')).toEqual(null);
    expect(next).toHaveBeenCalledWith(redirectUrl);
  });

  it('doesn‘t set the access token if the hash is empty', () => {
    const to = { hash: '' };
    beforeRoute(to, from, next);

    expect(window.localStorage.getItem('access_token')).toEqual(null);
    expect(next).toHaveBeenCalledWith({ name: 'Login' });
  });

  it('redirects to "/login" if no access token is set', () => {
    const to = { hash: '', name: 'notLogin' };
    beforeRoute(to, from, next);

    expect(next).toHaveBeenCalledWith({ name: 'Login' });
  });

  it('stays on "/login" if no access token is set', () => {
    const to = { hash: '', name: 'Login' };
    beforeRoute(to, from, next);

    expect(next).toHaveBeenCalledWith();
  });

  it('redirects from "/login" to "/" if access token is set', () => {
    const to = { hash: '', name: 'Login' };
    window.localStorage.setItem('access_token', 'access_token');
    beforeRoute(to, from, next);

    expect(next).toHaveBeenCalledWith({ name: 'Home' });
  });
});
