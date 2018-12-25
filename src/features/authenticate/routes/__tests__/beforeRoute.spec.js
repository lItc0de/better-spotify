import beforeRoute from '../beforeRoute';

const accessToken = 'access_token';
const from = {};
const next = jest.fn();

describe('authentication before route', () => {
  afterEach(() => {
    window.localStorage.removeItem('access_token');
  });

  it('saves the access token to the local store', () => {
    const to = { hash: `#access_token=${accessToken}` };
    beforeRoute(to, from, next);

    expect(window.localStorage.getItem('access_token')).toEqual(accessToken);
    expect(next).toHaveBeenCalledWith();
  });

  it('doesn‘t set the access token if the hash is empty', () => {
    const to = { hash: '' };
    beforeRoute(to, from, next);

    expect(window.localStorage.getItem('access_token')).toEqual(null);
    expect(next).toHaveBeenCalledWith();
  });

  it('redirects to "/login" if no access token is set', () => {
    const to = { hash: '', name: 'notLogin' };
    beforeRoute(to, from, next);

    expect(next).toHaveBeenCalledWith({ name: 'Login' });
  });

  it('redirects from "/login" to "/" if access token is set', () => {
    const to = { hash: '', name: 'Login' };
    window.localStorage.setItem('access_token', 'access_token');
    beforeRoute(to, from, next);

    expect(next).toHaveBeenCalledWith({ name: 'Home' });
  });
});
