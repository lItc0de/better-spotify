import { splitHash } from './routerHelper';

describe('splitHash', () => {
  const hash = '#test=111&test2=222';
  it('creates an object from the route hash params', () => {
    const splitedHash = splitHash(hash);

    expect(splitedHash).toEqual({
      test: '111',
      test2: '222',
    });
  });

  it('returns an empty object if hash is empty', () => {
    const splitedHash = splitHash('');

    expect(splitedHash).toEqual({});
  });
});
