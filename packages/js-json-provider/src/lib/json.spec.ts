import { JsonProvider } from './json';

describe('JsonProvider', () => {
  it('should have the name property set', () => {
    const provider = new JsonProvider();
    expect(provider.name).toEqual('json');
  });
});
