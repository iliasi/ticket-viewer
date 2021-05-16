const requestApiToken = require('../lib/reqApiToken');

describe('API Token not Set', () => {
    test('if API token is not set', () => {
      expect(!requestApiToken.checkTokenIsStored()).toBeTruthy();
    });
  });