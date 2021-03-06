import MockAdapter from 'axios-mock-adapter';
import client from '@/client';
import loginPath from '@/auth/loginPath';
import { restoreMockedWindow, mockWindowLocation } from '@/utils/mockWindow';

const mock = new MockAdapter(client);

describe('client', () => {
  describe('with valid access token', () => {
    beforeAll(() => {
      window.localStorage.setItem('access_token', 'access_token');
    });

    afterAll(() => {
      window.localStorage.removeItem('access_token');
    });

    it('calls the api and returns the results', async () => {
      const testResponse = { test: true };
      mock.onGet('/v1').reply(200, testResponse);

      const res = await client.get('/v1');

      expect(res.data).toEqual(testResponse);
      expect(res.status).toEqual(200);
    });
  });

  describe('incorrect access token', () => {
    const { assign } = window.location;

    beforeEach(() => {
      window.location.assign = jest.fn();
    });

    afterAll(() => {
      window.location.assign = assign;
    });

    describe('access token not set', () => {
      it('should redirect to spotify login', async () => {
        await expect(client.get('/v1')).resolves.toEqual(null);
        expect(window.location.assign).toHaveBeenCalledWith(loginPath);
      });
    });

    describe('access token invalid', () => {
      const testResponse = { test: true };

      beforeAll(() => {
        mock.onGet('/v1').reply(401, testResponse);

        window.localStorage.setItem('access_token', 'access_token');
      });

      afterAll(() => {
        window.localStorage.removeItem('access_token');
        restoreMockedWindow();
      });

      it('should redirect to spotify login', async () => {
        await expect(client.get('/v1')).resolves.toEqual(null);
        expect(window.location.assign).toHaveBeenCalledWith(loginPath);
      });

      it('should save the current location in the local store', async () => {
        const redirectUrl = '/test-redirect';
        mockWindowLocation(redirectUrl);

        await expect(client.get('/v1')).rejects.toThrowError();
        expect(window.localStorage.getItem('redirect_url')).toEqual(redirectUrl);
      });
    });
  });
});
