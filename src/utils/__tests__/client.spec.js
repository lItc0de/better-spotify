import MockAdapter from 'axios-mock-adapter';
import client from '@/utils/client';
import loginPath from '@/features/authenticate/services/loginPath';

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

  describe('incorrecct access token', () => {
    const { assign } = window.location;

    beforeEach(() => {
      window.location.assign = jest.fn();
    });

    afterAll(() => {
      window.location.assign = assign;
    });

    describe('access token not set', () => {
      it('should redirect to spotify login', async () => {
        const res = { response: { status: 401 } };
        await expect(client.get('/v1')).rejects.toEqual(res);
        expect(window.location.assign).toHaveBeenCalledWith(loginPath);
      });
    });

    describe('access token invalid', () => {
      beforeAll(() => {
        window.localStorage.setItem('access_token', 'access_token');
      });

      afterAll(() => {
        window.localStorage.removeItem('access_token');
      });

      it('should redirect to spotify login', async () => {
        const testResponse = { test: true };
        mock.onGet('/v1').reply(401, testResponse);

        await expect(client.get('/v1')).rejects.toThrowError();
        expect(window.location.assign).toHaveBeenCalledWith(loginPath);
      });
    });
  });
});
