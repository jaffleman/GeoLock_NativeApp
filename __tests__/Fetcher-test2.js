import fetcher from '../src/functions/fetcher';

jest.mock('@env', () => ({
  REACT_APP_ROUTE: 'https://ipv6.mock',
  LOCAL_APP_ROUTE2: 'https://ipv4.mock',
}));

const abortMock = jest.fn();

global.AbortController = function () {
  this.signal = { aborted: false };
};
global.AbortController.prototype.abort = abortMock;

global.clearTimeout = jest.fn();
global.fetch = jest.fn((url, options) => {
  if (url.startsWith('https://api.jaffleman.tech/geolock/')) {
    return Promise.resolve({
      json: () => new Promise(resolve => {
        setTimeout(() => {
          resolve({ success: 'mocked response' });
        }, 1000);
      }),
  })}

  if (url.startsWith('http://82.64.128.239:3244/geolock/')) {
    return Promise.resolve({
      json: () => new Promise(resolve => {
        setTimeout(() => {
          resolve({ success: 'mocked response' });
        }, 3000);
      }),
    });
  }

  return Promise.reject(new Error('Unknown route'));
});

describe('fetcher', () => {
  it('should call callback with IPv6 response and abort IPv4', async () => {
    const mockCallback = jest.fn();

    await new Promise(resolve => {
      fetcher(
        {
          route: '/test',
          method: 'POST',
          data: { key: 'value' },
          callback: result => {
            mockCallback(result);
            resolve();
          },
        },
        '[TEST] '
      );
    });

    expect(mockCallback).toHaveBeenCalledWith({ success: 'mocked response' });
    expect(abortMock).toHaveBeenCalledWith('ipv6 request completed');
  });
});