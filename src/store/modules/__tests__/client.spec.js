import store from '@/store/modules/client';
import LocalStorageMock from '@/__mocks__/localStorage';

jest.mock('@/store/modules/index.js');
global.localStorage = new LocalStorageMock();

describe('client module', () => {
  beforeEach(() => {
    localStorage.clear();
    window.location.assign = jest.fn();
  });

  it('has an default api', () => {
    expect(store.state.api).toEqual(null);
  });

  it('has an default accessToken', () => {
    expect(store.state.accessToken).toEqual('');
  });

  describe('setApi mutation', () => {
    it('sets the api with an valid access token', () => {
      const accessToken = 'foo';
      const state = { api: null };

      store.mutations.setApi(state, accessToken);

      expect(state.api.headers.Authorization).toEqual(`Bearer ${accessToken}`);
      expect(state.accessToken).toEqual(accessToken);
    });

    it('sets the api with a new accessToken', () => {
      const accessToken = 'foo';
      const api = { header: '' };
      const state = { api };

      store.mutations.setApi(state, accessToken);

      expect(state.api.headers.Authorization).toEqual(`Bearer ${accessToken}`);
      expect(state.accessToken).toEqual(accessToken);
    });

    it('returns if the api is already set with the same acces token', () => {
      const accessToken = 'foo';
      const api = { header: '' };
      const state = { api, accessToken };

      store.mutations.setApi(state, accessToken);

      expect(state.api).toEqual(api);
    });

    it('returns if no accessToken is provided', () => {
      const accessToken = undefined;
      const api = null;
      const state = { api };

      store.mutations.setApi(state, accessToken);

      expect(state.api).toEqual(api);
    });
  });

  describe('login action', () => {
    it('redirects to the login path', () => {
      const accessToken = undefined;
      const api = null;
      const loginPath = 'http://localhost/somePath';
      const state = { api, accessToken };
      const getters = { loginPath };
      const commit = jest.fn();

      store.actions.login({ state, getters, commit });

      expect(window.location.assign).toHaveBeenCalledWith(loginPath);
    });

    it('doesn‘t redirect if the access token and api is already set', () => {
      const accessToken = 'someToken';
      const api = {};
      const loginPath = 'somePath';
      const state = { api, accessToken };
      const getters = { loginPath };

      store.actions.login({ state, getters });

      expect(window.location.assign).not.toHaveBeenCalled();
    });
  });

  describe('handleFetchError', () => {
    it('redirects to the login path when 401', () => {
      const res = { status: 401 };
      const loginPath = 'somePath';
      const getters = { loginPath };

      store.actions.handleFetchError({ getters }, res);

      expect(window.location.assign).toHaveBeenCalledWith(loginPath);
    });
  });
});
