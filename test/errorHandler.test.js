const errorHandler = require('../lib/errorHandler');

describe('API Errors', () => {
  test('Throws on error response from API', () => {
    expect(() => {
      errorHandler(error);
    }).toThrow();
  });
});

