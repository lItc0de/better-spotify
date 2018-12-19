import MockAdapter from 'axios-mock-adapter';
import client from '@/utils/client';

const mock = new MockAdapter(client);

describe('client', () => {
  describe('with valid access token', () => {
    it('calls the api and returns the results', async () => {
      const testResponse = { test: true };
      mock.onGet('/v1').reply(200, testResponse);

      const res = await client.get('/v1');

      expect(res.data).toEqual(testResponse);
    });
  });
});
