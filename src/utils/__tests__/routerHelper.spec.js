import store from '@/store';
import { loggedInOrRedirect } from '@/utils/routerHelper';

jest.mock('@/store/modules/index.js', () => ({
  client: {
    namespaced: true,
    state: {
      accessToken: '',
    },
    mutations: {
      setApi: jest.fn(),
    },
  },
}));

describe('redirectBackOrHome', () => {
  it('', () => {

  });
});

describe('loggedInOrRedirect', () => {
  let to;
  let from;
  let next;

  beforeEach(() => {
    to = {
      matched: [{ meta: { auth: true } }],
    };
    from = {};
    next = jest.fn();

    store.commit = jest.fn();

    window.localStorage = { getItem: jest.fn().mockReturnValue('') };
  });

  it('calles next if auth is not set', () => {
    to = {
      matched: [{ meta: {} }],
    };

    loggedInOrRedirect(to, from, next);

    expect(next).toBeCalledWith();
  });

  it('redirects to log in page if auth is set an user is not logged in', () => {
    loggedInOrRedirect(to, from, next);

    expect(next).toBeCalledWith({ name: 'Login' });
  });

  it('sets the access token from the local store if provided and user not logged in', () => {
    const accessToken = 'access-token';
    window.localStorage = { getItem: jest.fn().mockReturnValue(accessToken) };

    loggedInOrRedirect(to, from, next);

    expect(store.commit).toBeCalledWith('client/setApi', accessToken);
  });

  it('calles next if the user is logged in', () => {
    store.state.client.accessToken = 'access-token';

    loggedInOrRedirect(to, from, next);

    expect(next).toBeCalledWith();
    store.state.client.accessToken = '';
  });

  it('redirects home if path /login but already logged in', () => {
    store.state.client.accessToken = 'access-token';
    to.name = 'Login';

    loggedInOrRedirect(to, from, next);

    expect(next).toBeCalledWith({ name: 'Home' });
    store.state.client.accessToken = '';
  });
});
